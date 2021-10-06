import React from 'react';
import GoogleLogin from 'react-google-login';

import { CartContext } from '../utils/CartContext';

function GLogin() {
  const [loggedIn, setLoggedIn] = React.useContext(CartContext);

  const responseGoogle = (response) => {
    console.log(response.accessToken);
    setLoggedIn('authorizedUser');
    window.alert(
      `Google sent this accessToken: ${response.accessToken} and is ${loggedIn}`
    );
  };
  return (
    <div>
      <GoogleLogin
        clientId="787959829708-pmrggn7s2qgi4pjc7jnj23tj30n2c34f.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GLogin;
