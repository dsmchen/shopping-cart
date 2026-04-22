import { Link, useOutletContext } from 'react-router-dom';
import CartCard from '../../components/cart-card/cart-card';
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

  return (
    <div className={classes.cart}>
      {cart.map((c) => (
        <CartCard key={c.productId} productId={c.productId} count={c.count} />
      ))}
    </div>
  );
}
