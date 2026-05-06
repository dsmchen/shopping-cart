import Loading from '../../components/loading/loading';
import Error from '../../components/error/error';
import ShopCard from '../../components/shop-card/shop-card';
import useData from '../../hooks/useData';
import classes from './shop.module.css';

export default function Shop({ testUrl }) {
  const url = testUrl ?? 'https://fakestoreapi.com/products';
  const { data, error, loading } = useData(url);

  let cards = [];

  if (data) {
    cards = data.map((d) => (
      <ShopCard
        key={d.id}
        productId={d.id}
        productTitle={d.title}
        productImage={d.image}
      />
    ));
  }

  if (loading) {
    return (
      <Loading wrapperClass={classes.shop} loadingClass={classes.loading} />
    );
  }

  if (error) {
    return (
      <Error
        wrapperClass={classes.shop}
        errorClass={classes.error}
        error={error}
      />
    );
  }

  return <div className={classes.shop}>{cards}</div>;
}
