import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children ?? <Outlet />}</main>
    </>
  );
}
