import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cart={cart} />
      <main>{children ?? <Outlet context={[cart, setCart]} />}</main>
    </>
  );
}
