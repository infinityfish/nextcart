import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { CartContext } from '../utils/CartContext';

function Home(props) {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const { isLoading, error, data } = useQuery('productsListData', () =>
    fetch('http://localhost:8000/products/api/products/').then((res) =>
      res.json()
    )
  );
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const onAdd = (product) => {
    console.log(cartItems);
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="row">
        {data.map((product) => (
          <div key={product.slug}>
            <Link href={`/${product.slug}`}>
              <p>
                {product.name} ${product.price}
              </p>
            </Link>

            <button onClick={() => onAdd(product)}>Add To Cart</button>
          </div>
        ))}
      </div>
    </main>
  );
}
export default Home;
