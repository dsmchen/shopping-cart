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

  return <div className="shop">{cards}</div>;
}
