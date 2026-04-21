import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import RootLayout from './layouts/root-layout';
import ErrorPage from './pages/error-page/error-page';
import Home from './routes/home/home';
import Shop from './routes/shop';
import Cart from './routes/cart/cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
