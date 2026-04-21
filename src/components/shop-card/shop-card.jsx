export default function ShopCard({ title }) {
  return (
    <div className="shopCard">
      <h2>{title}</h2>
      <form>
        <input type="number" min="0" />
        <button type="submit">Add to cart</button>
      </form>
    </div>
  );
}
