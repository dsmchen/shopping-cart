import { createRoutesStub } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Root from '../routes/root';
import Home from '../routes/home/home';
import Shop from '../routes/shop/shop';
import Cart from '../routes/cart/cart';

beforeEach(() => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Root,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: '/shop',
          Component: Shop,
        },
        {
          path: '/cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub />);
});

describe('Root component', () => {
  it('renders correct heading', () => {
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(
      /amaze/i,
    );
  });

  it('navigates correctly', async () => {
    const homeHeadings = screen.getAllByRole('heading', {
      name: 'Up to 95% off on your first 3 orders',
      level: 2,
    });
    const user = userEvent.setup();

    expect(homeHeadings).toHaveLength(3);

    user.click(screen.getByText('Shop'));
    await waitFor(() => screen.findByText('Loading...'));

    user.click(screen.getByText('Amaze'));
    expect(homeHeadings).toHaveLength(3);

    user.click(screen.getByText('Cart (0)'));
    await waitFor(() =>
      screen.getByRole('heading', { name: 'Your cart is empty', level: 2 }),
    );

    user.click(screen.getByText('Home'));
    expect(homeHeadings).toHaveLength(3);
  });
});
