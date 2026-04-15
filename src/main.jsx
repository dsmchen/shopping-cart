import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import RootLayout from './layouts/root-layout';
import ErrorPage from './pages/error-page/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <RootLayout>
        <ErrorPage />
      </RootLayout>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
