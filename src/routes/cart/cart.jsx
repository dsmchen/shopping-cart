import { Link, useOutletContext } from 'react-router-dom';
import classes from './cart.module.css';

export default function Cart() {
  const [cart] = useOutletContext();

  if (!cart.length) {
    return (
      <div className={`${classes.cart} ${classes.empty}`}>
        <h2>Your cart is empty</h2>
        <Link to="/shop">Shop now</Link>
      </div>
    );
  }
}
