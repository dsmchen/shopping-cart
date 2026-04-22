import { useOutletContext } from 'react-router-dom';

export default function CartCard({ productId, count }) {
  const [cart, setCart] = useOutletContext();
  const options = [];

  for (let index = 1; index < 31; index++) {
    options.push(
      <option key={index} value={index}>
        {index}
      </option>,
    );
  }

  function handleChange(e) {
    setCart(
      cart.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            count: e.target.value,
          };
        } else {
          return item;
        }
      }),
    );
  }

  return (
    <div className="cartCard">
      <p>Product ID: {productId}</p>
      <form noValidate>
        <label>
          <span>Quantity</span>
          <select defaultValue={count} onChange={handleChange}>
            {options}
          </select>
        </label>
      </form>
    </div>
  );
}
