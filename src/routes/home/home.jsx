import homeData from '../../db/home-data';
import HomeCard from '../../components/home-card/home-card';
import classes from './home.module.css';

export default function Home() {
  const data = homeData;

  let cards = [];

  if (data) {
    cards = data.map((d, i) => (
      <HomeCard
        key={i}
        title={d.title}
        imageUrl={d.imageUrl}
        linkUrl={d.linkUrl}
        linkText={d.linkText}
      />
    ));
  }

  return <div className={classes.home}>{cards}</div>;
}
