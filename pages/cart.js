import React from 'react';
import { CartContext } from '../utils/CartContext';

function Cart() {
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.07;
  const shippingPrice = itemsPrice > 10000 ? 0 : 200;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const onAdd = (product) => {
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
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
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
              <button onClick={() => alert('Check Coming Soon!')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
