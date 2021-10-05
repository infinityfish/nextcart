import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { CartContext } from '../utils/CartContext';

function product() {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const router = useRouter();
  const { slug } = router.query;

  // const { isLoading, error, data } = useQuery('product', () =>
  //   fetch(`http://localhost:8000/products/api/products/${slug}`).then((res) =>
  //     res.json()
  //   )
  // );
  // if (isLoading) return 'Loading...';
  // if (error) return 'An error has occurred: ' + error.message;

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
    <div>
      <p>
        {' '}
        {data.name} ${data.price} Qty in Stock: {data.quantity}
      </p>
      <p>{data.description}</p>
      <button onClick={() => router.back()}>Continue Shopping</button>
      {'  '}
      <button onClick={() => onAdd(product)}>Add To Cart</button>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:8000/products/api/products/');
  const products = await res.json();

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:8000/products/api/products/${params.slug}`
  );
  const data = await res.json();

  // Pass product data to the page via props
  return { props: { data } };
}
export default product;
