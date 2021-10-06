import React, { useState, useEffect } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState('');

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
    // const data = fromStorage && JSON.parse(fromStorage);
    if (fromStorage) {
      setLoggedIn(fromStorage);
    }
  }, []);

  useEffect(() => {
    // const data = JSON.stringify(loggedIn);
    window.localStorage.setItem('nextAuthToken', loggedIn);
  }, [loggedIn]);

  //UserProfile
  useEffect(() => {
    const fromStorage = window.localStorage.getItem('nextUserProfile');
    // const data = fromStorage && JSON.parse(fromStorage);
    if (fromStorage) {
      setUserProfile(fromStorage);
    }
  }, []);

  useEffect(() => {
    // const data = JSON.stringify(loggedIn);
    window.localStorage.setItem('nextUserProfile', userProfile);
  }, [userProfile]);

  return (
    <CartContext.Provider
      value={[
        cartItems,
        setCartItems,
        loggedIn,
        setLoggedIn,
        userProfile,
        setUserProfile,
      ]}
    >
      {props.children}
    </CartContext.Provider>
  );
};
