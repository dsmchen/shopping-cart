import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../routes/root';

beforeAll(() => {
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
});
