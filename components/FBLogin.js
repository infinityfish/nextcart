import React, { Component } from 'react';
import { FacebookProvider, Login } from 'react-facebook';
import Button from '@material-ui/core/Button';
import axios from '../utils/axios';

//context is implemented differently in class components, read the docs

export default class FBLogin extends Component {
  handleResponse = (data) => {
    // data comes from facebook: contains the access token which we send to django
    axios
      .post('/dj-rest-auth/facebook/', {
        access_token: data.tokenDetail.accessToken,
      })
      .then(function (response) {
        //django validates access token with facebook, and then sends us a key
        // console.log(response.data.key);

        //set globalstate here now

        window.alert(`Django sent this key: ${response.data.key} and is `);
        window.localStorage.setItem('nextAuthToken', 'authorizedUser');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleError = (error) => {
    this.setState({ error });
  };

  render() {
    return (
      <FacebookProvider appId="1240924409691268">
        <Login
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          {({ loading, handleClick, error, data }) => (
            <span onClick={handleClick}>
              <Button color="primary" variant="outlined" type="submit">
                Login via Facebook
              </Button>
              {loading && <span>Loading...</span>}
            </span>
          )}
        </Login>
      </FacebookProvider>
    );
  }
}
