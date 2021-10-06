import React from 'react';
import FacebookLogin from 'react-facebook-login';

function FBLogin2() {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId="1240924409691268"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="my-facebook-button-class"
      icon="fa-facebook"
    />
  );
}
export default FBLogin2;
