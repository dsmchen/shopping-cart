import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Root from '../routes/root';
import RootLayout from '../layouts/root-layout';
import ErrorPage from '../pages/error-page/error-page';

beforeEach(() => {
  const routes = [
    {
      path: '/',
      element: <Root />,
      errorElement: (
        <RootLayout>
          <ErrorPage />
        </RootLayout>
      ),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/bad/route'],
  });

  render(<RouterProvider router={router} />);
});

describe('Error Page component', () => {
  it('renders error page', () => {
    expect(screen.getByRole('heading', { level: 2 }).textContent).toMatch(
      /oops/i,
    );
    expect(screen.getAllByRole('paragraph')[0].textContent).toMatch(
      /sorry, an unexpected error has occurred/i,
    );
  });

  it('renders root layout', () => {
    const links = screen.getAllByRole('link');

    expect(links[0].textContent).toMatch(/amaze/i);
    expect(links[1].textContent).toMatch(/home/i);
    expect(links[2].textContent).toMatch(/shop/i);
    expect(links[3].textContent).toMatch(/cart/i);
  });
});
