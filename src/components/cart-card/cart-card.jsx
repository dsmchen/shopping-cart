import { useOutletContext } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loading from '../loading/loading';
import Error from '../error/error';
import ProductCard from '../product-card/product-card';
import Form from '../form/form';
import Button from '../button/button';
import classes from './cart-card.module.css';

export default function CartCard({ productId, count, testProductId }) {
  const [cart, setCart] = useOutletContext();
  const options = [];
  const url = `https://fakestoreapi.com/products/${testProductId ?? productId}`;
  const { data, error, loading } = useData(url);

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

  function handleSubmit() {
    setCart(
      cart.filter((item) => {
        if (item.productId !== productId) {
          return item;
        }
      }),
    );
  }

  if (loading) {
    return (
      <Loading wrapperClass={classes.cartCard} loadingClass={classes.loading} />
    );
  }

  if (error) {
    return (
      <Error
        wrapperClass={classes.cartCard}
        errorClass={classes.error}
        error={error}
      />
    );
  }

  if (data) {
    return (
      <ProductCard
        cardClass={classes.cartCard}
        imageSrc={data.image}
        heading={data.title}
      >
        <Form handleSubmit={handleSubmit}>
          <label>
            <span className={classes.labelText}>Quantity</span>
            <select defaultValue={count} onChange={handleChange}>
              {options}
            </select>
          </label>
          <Button type="submit" buttonClass={classes.deleteBtn}>
            Delete
          </Button>
        </Form>
      </ProductCard>
    );
  }
}
