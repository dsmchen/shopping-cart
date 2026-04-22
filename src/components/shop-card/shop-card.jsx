import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function ShopCard({ productId, productTitle }) {
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
            if (item.productId === formJson.productId) {
              return { ...item, count: formJson.count };
            } else {
              return item;
            }
          }),
        );
      } else {
        setCart(cart.concat(formJson));
      }
      setError(null);
    } else {
      setError('Please enter a number from 1 to 30.');
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
    <div className="shopCard">
      <h2>{productTitle}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          <span>Quantity</span>
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
          {error && (
            <span id={`error-${productId}`} role="alert">
              {error}
            </span>
          )}
          <button type="button" onClick={increment} disabled={count >= 30}>
            Increment
          </button>
          <button type="button" onClick={decrement} disabled={count <= 1}>
            Decrement
          </button>
        </label>
        <button type="submit">Add to cart</button>
        <input type="hidden" name="productId" value={productId} />
      </form>
    </div>
  );
}
