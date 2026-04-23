import { useOutletContext } from 'react-router-dom';
import useData from '../../hooks/useData';
import classes from './cart-card.module.css';

export default function CartCard({ productId, count }) {
  const [cart, setCart] = useOutletContext();
  const options = [];
  const url = `https://fakestoreapi.com/products/${productId}`;
  const { data, error, loading } = useData(url);

  for (let index = 1; index < 31; index++) {
    options.push(
      <option key={index} value={index}>
        {index}
      </option>,
    );
  }

  function handleChange(e) {
    setCart(
      cart.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            count: e.target.value,
          };
        } else {
          return item;
        }
      }),
    );
  }

  function handleSubmit() {
    setCart(
      cart.filter((item) => {
        if (item.productId !== productId) {
          return item;
        }
      }),
    );
  }

  if (loading) {
    return (
      <div className={classes.cartCard}>
        <h2 className={classes.loading}>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.cartCard}>
        <div className={classes.error}>
          <h2>Oops!</h2>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className={classes.cartCard}>
        <div className="imageTitleContainer">
          <div className={classes.imageWrapper}>
            <img src={data.image} alt="" />
          </div>
          <h2>{data.title}</h2>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            <span className={classes.labelText}>Quantity</span>
            <select defaultValue={count} onChange={handleChange}>
              {options}
            </select>
          </label>
          <div className="buttonWrapper">
            <button type="submit" className={classes.deleteBtn}>
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}
