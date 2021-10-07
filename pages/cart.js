import React from 'react';
import axios from 'axios';
import { CartContext } from '../utils/CartContext';

import OrderForm from '../components/OrderForm';

function Cart() {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 10000 ? 0 : 200;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const updatecart = (product) => {
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

  async function tryAdding(item, itemQty) {
    const { data } = await axios.get(
      `http://localhost:8000/products/api/products/${item.slug}`
    );
    //there's one in the cart already
    if (data.quantity < itemQty + 1) {
      window.alert(`Maximum quantity available is ${data.quantity}`);
      return;
    } else {
      updatecart(item);
    }
  }

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const [shouldShow, setShouldShow] = React.useState(false);

  return (
    <div>
      <h2>Cart Page</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <img
              className="small"
              src={item.image}
              alt={item.name}
              width="80"
              height="80"
            />
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              {/* {tryAdding(item) ? ( */}
              <button onClick={() => tryAdding(item, item.qty)} className="add">
                +
              </button>
              {/* ) : (
                <button className="add" disabled>
                  +
                </button>
              )} */}
            </div>

            <div className="col-2 text-right">
              {item.qty} x ₦{item.price}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">₦{itemsPrice}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">₦{taxPrice}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">₦{shippingPrice}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>₦{totalPrice}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => setShouldShow(true)}>Checkout</button>
              {shouldShow ? <OrderForm /> : 'Button for checkout'}
            </div>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default Cart;
