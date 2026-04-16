import { Link } from 'react-router-dom';
import classes from './home-card.module.css';

export default function HomeCard({ title, imageUrl, linkUrl, linkText }) {
  return (
    <Link to={linkUrl}>
      <div className={classes.homeCard}>
        <div>
          <h2>{title}</h2>
          <img src={imageUrl} alt="" />
        </div>
        <p>{linkText}</p>
      </div>
    </Link>
  );
}
