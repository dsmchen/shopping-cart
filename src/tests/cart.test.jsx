import { createRoutesStub } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../routes/root';
import Cart from '../routes/cart/cart';

beforeEach(() => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Root,
      children: [
        {
          path: '/cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);
});

describe('Cart component', () => {
  it('renders empty cart state', () => {
    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /your cart is empty/i,
    );
  });
});
