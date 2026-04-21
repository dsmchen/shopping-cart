import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function ShopCard({ productId, productTitle }) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [cart, setCart] = useOutletContext();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      if (formJson.count > 30) {
        setError('Please enter a number from 0 to 30.');
      } else {
        const index = cart.findIndex(
          (item) => item.productId === formJson.productId,
        );

        if (index === -1) {
          setCart(cart.concat(formJson));
        } else {
          setCart(
            cart.map((item) => {
              if (item.productId === formJson.productId) {
                return { ...item, count: formJson.count };
              } else {
                return item;
              }
            }),
          );
        }

        setError(null);
      }
    } else {
      setError('Please enter a number from 0 to 30.');
    }
  }

  function handleChange(e) {
    setCount(e.target.value);
  }

  function increment() {
    if (count < 0) {
      setCount(0);
      setError('Minimum quantity is 0.');
    } else {
      setCount((c) => Number(c) + 1);
      setError(null);
    }
  }

  function decrement() {
    if (count > 30) {
      setCount(30);
      setError('Maximum quantity is 30.');
    } else {
      setCount((c) => Number(c) - 1);
      setError(null);
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
          />
          {error && (
            <span id={`error-${productId}`} role="alert">
              {error}
            </span>
          )}
          <button type="button" onClick={increment} disabled={count >= 30}>
            Increment
          </button>
          <button type="button" onClick={decrement} disabled={count <= 0}>
            Decrement
          </button>
        </label>
        <button type="submit">Add to cart</button>
        <input type="hidden" name="productId" value={productId} />
      </form>
    </div>
  );
}
