import classes from './header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <a href="#">
        <h1>Amaze</h1>
      </a>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
