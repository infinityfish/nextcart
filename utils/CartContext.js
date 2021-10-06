import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState('guest');

  //cart
  useEffect(() => {
    const fromStorage = window.localStorage.getItem('nextcart');
    const data = fromStorage && JSON.parse(fromStorage);
    if (data) {
      setCartItems(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cartItems);
    window.localStorage.setItem('nextcart', data);
  }, [cartItems]);

  //auth
  useEffect(() => {
    const fromStorage = window.localStorage.getItem('nextAuthToken');
    const data = fromStorage && JSON.parse(fromStorage);
    if (data) {
      setLoggedIn('authorizedUser');
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(loggedIn);
    window.localStorage.setItem('nextAuthToken', data);
  }, [loggedIn]);

  return (
    <CartContext.Provider
      value={[cartItems, setCartItems, loggedIn, setLoggedIn]}
    >
      {props.children}
    </CartContext.Provider>
  );
};
