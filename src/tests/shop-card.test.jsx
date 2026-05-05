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

    expect(
      screen.getByRole('link', {
        name: 'Cart (0)',
      }),
    ).toBeInTheDocument();

    const addToCartButtons = screen.getAllByRole('button', {
      name: 'Add to cart',
    });

    await user.click(addToCartButtons[0]);

    expect(
      screen.getByRole('link', {
        name: 'Cart (1)',
      }),
    ).toBeInTheDocument();
  });
});
