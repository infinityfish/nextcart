import '../styles/globals.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartProvider } from '../utils/CartContext';
import Nav from '../components/nav/Nav';
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <Component {...pageProps} />
      </QueryClientProvider>
    </CartProvider>
  );
}

export default MyApp;
