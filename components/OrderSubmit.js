import React from 'react';
import axios from '../utils/axios';
import { CartContext } from '../utils/CartContext';

const orderData = {
  order_user: '',
  order_items: [],
  order_total_amount: 0,
  receiver_phone: '',
  receiver_email: '',
  order_code: '',
  payment_option: '',
  delivery_option: '',
};

export async function OrderSubmit(orderData, accessKey) {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 10000 ? 0 : 200;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const cartOrderInfo = {
    order_user: window.localStorage.getItem('nextAuthEmail'),
    order_items: cartItems,
    order_total_amount: totalPrice,
  };

  try {
    let res = await axios({
      url: 'http://localhost:8000/orders/add/',
      orderData,
      method: 'post',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${accessKey}`,
      },
    });
    if (res.status == 200) {
      console.log(res.status);
    }
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
