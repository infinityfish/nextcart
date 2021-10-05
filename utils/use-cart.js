import { useState, createContext, useContext, useEffect } from 'react';

// const defaultCart = {
//   products: {},
// };

export const CartContext = createContext();

export function useCartState() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fromStorage = window.localStorage.getItem('nextcart');
    const data = fromStorage && JSON.parse(fromStorage);
    if (data) {
      setCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('nextcart', data);
  }, [cart]);

  function addToCart({ id }) {
    setCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cart;
    });
  }

  return {
    cart,
    addToCart,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
