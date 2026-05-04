import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Root from '../routes/root';

beforeEach(() => {
  render(
    <MemoryRouter>
      <Root />
    </MemoryRouter>,
  );
});

describe('Root component', () => {
  it('renders correct heading', () => {
    expect(screen.getByRole('heading').textContent).toMatch(/amaze/i);
  });

  it('navigates correctly', async () => {
    const user = userEvent.setup();

    expect(
      await screen.findByText(/up to 95% off on your first 3 orders/i),
    ).toBeInTheDocument();
  });
});
