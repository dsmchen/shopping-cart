import ShopCard from '../components/shop-card/shop-card';
import useData from '../hooks/useData';

export default function Shop() {
  const url = 'https://fakestoreapi.com/products';
  const { data, error, loading } = useData(url);
  let cards = [];

  if (data) {
    cards = data.map((d) => (
      <ShopCard key={d.id} productId={d.id} productTitle={d.title} />
    ));
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
  }

  return <div className="shop">{cards}</div>;
}
