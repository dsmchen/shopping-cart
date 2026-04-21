import ShopCard from '../components/shop-card/shop-card';

export default function Shop() {
  const data = [
    { title: 'product 1' },
    { title: 'product 2' },
    { title: 'product 3' },
  ];

  return (
    <div className="shop">
      {data.map((d) => (
        <ShopCard key={d.title} title={d.title} />
      ))}
    </div>
  );
}
