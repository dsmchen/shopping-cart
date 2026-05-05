import { createRoutesStub } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Root from '../routes/root';
import Shop from '../routes/shop/shop';

beforeEach(async () => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Root,
      children: [
        {
          path: '/shop',
          Component: Shop,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/shop']} />);

  await screen.findByRole(
    'heading',
    {
      name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    },
    { timeout: 5000 },
  );
});

describe('Shop Card component', () => {
  it('adds 1 item to cart', async () => {
    const user = userEvent.setup();
    const addToCartBtn = screen.getAllByRole('button', {
      name: 'Add to cart',
    })[0];

    expect(
      screen.getByRole('link', {
        name: 'Cart (0)',
      }),
    ).toBeInTheDocument();

    await user.click(addToCartBtn);

    expect(
      screen.getByRole('link', {
        name: 'Cart (1)',
      }),
    ).toBeInTheDocument();
  });

  it('increments and decrements quantity', async () => {
    const user = userEvent.setup();
    const textbox = screen.getAllByRole('textbox', {
      name: 'Quantity + -',
    })[0];
    const incrementBtn = screen.getAllByRole('button', {
      name: 'Increment',
    })[0];
    const decrementBtn = screen.getAllByRole('button', {
      name: 'Decrement',
    })[0];

    expect(textbox).toHaveValue('1');

    await user.click(incrementBtn);

    expect(textbox).toHaveValue('2');

    await user.click(decrementBtn);

    expect(textbox).toHaveValue('1');
  });

  it('allows keyboard input quantity', async () => {
    const user = userEvent.setup();
    const textbox = screen.getAllByRole('textbox', {
      name: 'Quantity + -',
    })[0];

    await user.click(textbox);
    await user.keyboard('0');

    expect(textbox).toHaveValue('10');
  });
});
