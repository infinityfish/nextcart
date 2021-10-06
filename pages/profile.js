import React from 'react';
import { CartContext } from '../utils/CartContext';

function profile() {
  const [loggedIn, setLoggedIn] = React.useContext(CartContext);
  return (
    <div>
      {loggedIn === 'authorizedUser' ? 'Profile Visible' : 'Not for You'}
    </div>
  );
}

export default profile;
