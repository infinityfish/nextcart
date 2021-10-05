import React from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../utils/CartContext';

function product({ product }) {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const router = useRouter();
  // const { slug } = router.query;

  const onAdd = (product) => {
    // Cannot add more than quantity of 1
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      return cartItems;
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  return (
    <div>
      <p>
        {product.name} ${product.price} Qty in Stock: {product.quantity}
      </p>
      <p>{product.description}</p>
      <button onClick={() => router.back()}>Continue Shopping</button>
      {'  '}
      <button onClick={() => onAdd(product)}>Add To Cart</button>
    </div>
  );
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:8000/products/api/products/${params.slug}`
  );
  const product = await res.json();

  // Pass product data to the page via props
  return { props: { product } };
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
export default product;
