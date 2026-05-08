import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../product-card/product-card';
import Form from '../form/form';
import Button from '../button/button';
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
      setCount(count > 30 ? 30 : 1);
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
    <ProductCard
      cardClass="shopCard"
      imageSrc={productImage}
      heading={productTitle}
    >
      <Form handleSubmit={handleSubmit}>
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
              <Button
                handleClick={increment}
                disabled={count >= 30}
                ariaLabel="Increment"
              >
                +
              </Button>
              <Button
                handleClick={decrement}
                disabled={count <= 1}
                ariaLabel="Decrement"
              >
                -
              </Button>
            </div>
          </div>
          {error && (
            <span id={`error-${productId}`} role="alert">
              {error}
            </span>
          )}
        </label>
        <Button type="submit" buttonClass={classes.addToCartBtn}>
          Add to cart
        </Button>
        <input type="hidden" name="productId" value={productId} />
      </Form>
    </ProductCard>
  );
}
