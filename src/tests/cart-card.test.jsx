import {
  createMemoryRouter,
  createRoutesStub,
  RouterProvider,
} from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Root from '../routes/root';
import Shop from '../routes/shop/shop';
import Cart from '../routes/cart/cart';

describe('Cart Card component', () => {
  it('renders loading state', async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Root,
        children: [
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

    render(<Stub initialEntries={['/shop']} />);

    await screen.findByRole(
      'heading',
      {
        name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      },
      { timeout: 5000 },
    );

    const addToCartBtn = screen.getAllByRole('button', {
      name: 'Add to cart',
    })[0];

    await user.click(addToCartBtn);
    await user.click(screen.getByRole('link', { name: 'Cart (1)' }));

    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /loading/i,
    );
  });

  it('renders error state', async () => {
    const user = userEvent.setup();
    const routes = [
      {
        path: '/',
        element: <Root />,
        children: [
          {
            path: 'shop',
            element: <Shop />,
          },
          {
            path: 'cart',
            element: <Cart testProductId="abc" />,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/shop'],
    });

    render(<RouterProvider router={router} />);

    await screen.findByRole(
      'heading',
      {
        name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      },
      { timeout: 5000 },
    );

    const addToCartBtn = screen.getAllByRole('button', {
      name: 'Add to cart',
    })[0];

    await user.click(addToCartBtn);
    await user.click(screen.getByRole('link', { name: 'Cart (1)' }));
    await screen.findByRole('heading', {
      name: 'Oops!',
    });

    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /oops/i,
    );
  });

  it('renders data state', async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Root,
        children: [
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

    render(<Stub initialEntries={['/shop']} />);

    await screen.findByRole(
      'heading',
      {
        name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      },
      { timeout: 5000 },
    );

    const addToCartBtn = screen.getAllByRole('button', {
      name: 'Add to cart',
    })[0];

    await user.click(addToCartBtn);
    await user.click(screen.getByRole('link', { name: 'Cart (1)' }));
    await screen.findByRole('heading', {
      name: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    });

    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /fjallraven/i,
    );
  });
});
