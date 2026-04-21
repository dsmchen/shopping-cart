export default function CartCard({ productId, count }) {
  return (
    <div className="cartCard">
      <p>Product ID: {productId}</p>
      <p>Quantity: {count}</p>
    </div>
  );
}
