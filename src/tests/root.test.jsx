import { createRoutesStub } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    });
    const user = userEvent.setup();

    expect(homeHeadings).toHaveLength(3);

    await user.click(screen.getByRole('link', { name: 'Shop' }));
    screen.getByRole('heading', { name: 'Loading...' });

    await user.click(screen.getByRole('link', { name: 'Amaze' }));
    expect(homeHeadings).toHaveLength(3);

    await user.click(screen.getByRole('link', { name: 'Cart (0)' }));
    screen.getByRole('heading', { name: 'Your cart is empty' });

    await user.click(screen.getByRole('link', { name: 'Home' }));
    expect(homeHeadings).toHaveLength(3);
  });
});
