import homeData from '../../db/home-data';
import HomeCard from '../../components/home-card/home-card';
import classes from './home.module.css';

export default function Home() {
  const data = homeData;

  return (
    <div className={classes.home}>
      {data.map((d) => (
        <HomeCard
          key={d.title}
          title={d.title}
          imageUrl={d.imageUrl}
          linkUrl={d.linkUrl}
          linkText={d.linkText}
        />
      ))}
    </div>
  );
}
