import { Link } from 'react-router-dom';
import classes from './header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Link href="#">
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
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
