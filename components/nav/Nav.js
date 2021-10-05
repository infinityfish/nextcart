import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Nav.module.css';
import { CartContext } from '../../utils/CartContext';

const Nav = () => {
  const [cartItems] = React.useContext(CartContext);
  return (
    <div>
      <Head>
        <title>NextCart</title>

        {/* {description && <meta name="description" content={description}></meta>} */}
      </Head>
      <nav className={styles.nav}>
        <Link href="/">
          <p className={styles.navTitle}>NextCart</p>
        </Link>
        <Link href="/cart">
          <p className={styles.navCart}>
            <button>Cart: {cartItems.length}</button>
          </p>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
