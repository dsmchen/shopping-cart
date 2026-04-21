import ShopCard from '../components/shop-card/shop-card';

export default function Shop() {
  const data = [
    { id: 1, title: 'product 1' },
    { id: 2, title: 'product 2' },
    { id: 3, title: 'product 3' },
  ];

  return (
    <div className="shop">
      {data.map((d) => (
        <ShopCard key={d.id} productId={d.id} productTitle={d.title} />
      ))}
    </div>
  );
}
