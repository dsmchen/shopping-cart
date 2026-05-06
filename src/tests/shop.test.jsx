import { createRoutesStub } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../routes/root';
import Shop from '../routes/shop/shop';

describe('Shop component', () => {
  it('renders loading state', () => {
    render(<Shop />);

    expect(screen.getByRole('heading').textContent).toMatch(/loading/i);
  });

  it('renders error state', async () => {
    render(<Shop testUrl="https://example.com/" />);

    await screen.findByRole('heading', { name: 'Oops!' });

    expect(screen.getByRole('heading').textContent).toMatch(/oops/i);
  });

  it('renders data state', async () => {
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

    expect(
      screen.getAllByRole('heading', {
        level: 2,
      }),
    ).toHaveLength(20);
  });
});
