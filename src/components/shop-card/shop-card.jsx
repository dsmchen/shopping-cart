import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import classes from './shop-card.module.css';

export default function ShopCard({ productId, productTitle, productImage }) {
  const [count, setCount] = useState(1);
  const [error, setError] = useState(null);
  const [cart, setCart] = useOutletContext();

  function checkProductId(arr, val) {
    return arr.some((arrVal) => arrVal.productId === val);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (form.checkValidity() && formJson.count >= 1 && formJson.count <= 30) {
      if (checkProductId(cart, formJson.productId)) {
        setCart(
          cart.map((item) => {
            const newCount = Number(item.count) + Number(formJson.count);

            if (item.productId === formJson.productId && newCount <= 30) {
              setError(null);

              return {
                ...item,
                count: newCount,
              };
            } else {
              setError(
                newCount > 30
                  ? "We're sorry. You've requested more of this product than the 30 available."
                  : null,
              );

              return item;
            }
          }),
        );
      } else {
        setCart(cart.concat(formJson));
        setError(null);
      }
    } else {
      setError('Please enter a number from 1 to 30.');
      if (count > 30) {
        setCount(30);
      } else {
        setCount(1);
      }
    }
  }

  function handleChange(e) {
    setCount(e.target.value);
  }

  function increment() {
    if (count >= 1) {
      setCount((c) => Number(c) + 1);
      setError(null);
    } else {
      setCount(1);
      setError('Minimum quantity is 1.');
    }
  }

  function decrement() {
    if (count <= 30) {
      setCount((c) => Number(c) - 1);
      setError(null);
    } else {
      setCount(30);
      setError('Maximum quantity is 30.');
    }
  }

  return (
    <div className={classes.shopCard}>
      <div className="imageTitleContainer">
        <div className={classes.imageWrapper}>
          <img src={productImage} alt="" />
        </div>
        <h2>{productTitle}</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          <div className={classes.row}>
            <span className={classes.labelText}>Quantity</span>
            <input
              name="count"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={count}
              onChange={handleChange}
              aria-describedby={`error-${productId}`}
              autoComplete="off"
            />
            <div className={classes.column}>
              <button
                type="button"
                onClick={increment}
                disabled={count >= 30}
                aria-label="Increment"
              >
                +
              </button>
              <button
                type="button"
                onClick={decrement}
                disabled={count <= 1}
                aria-label="Decrement"
              >
                -
              </button>
            </div>
          </div>
          {error && (
            <span id={`error-${productId}`} role="alert">
              {error}
            </span>
          )}
        </label>
        <button type="submit" className={classes.addToCartBtn}>
          Add to cart
        </button>
        <input type="hidden" name="productId" value={productId} />
      </form>
    </div>
  );
}
