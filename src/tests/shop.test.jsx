import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from '../routes/shop/shop';

describe('Shop component', () => {
  it('renders loading state', () => {
    render(<Shop />);

    expect(screen.getByRole('heading').textContent).toMatch(/loading/i);
  });

  it('renders error state', async () => {
    render(<Shop propUrl="https://example.com/" />);

    await screen.findByRole('heading', undefined, { timeout: 9000 });

    expect(screen.getByRole('heading').textContent).toMatch(/oops/i);
  });
});
