import { Link } from 'react-router-dom';
import classes from './header.module.css';

export default function Header({ cart }) {
  const initialValue = 0;
  const sumWithInitial = cart.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.count),
    initialValue,
  );
  const displayValue = sumWithInitial > 99 ? '99+' : sumWithInitial;

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>Amaze</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="cart">Cart ({displayValue ?? initialValue})</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
