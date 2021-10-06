import React, { useContext, useEffect } from 'react';

import { CartContext } from '../utils/CartContext';
import { useRouter } from 'next/router';
import axios from '../utils/axios';

function profile() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useContext(CartContext);
  const [profileEmail, setProfileEmail] = React.useState('');

  useEffect(() => {
    const accessKey = window.localStorage.getItem('nextAuthToken');
    const email = window.localStorage.getItem('nextAuthEmail');
    setProfileEmail(email);
    if (accessKey !== null) {
      // get to api to get profile
      // console.log(accessKey);
      getProfile(accessKey, email);
    }
  }, []);

  // run a second useEffect to get the LocalStorage info

  async function getProfile(accessKey, email) {
    try {
      let res = await axios({
        url: `http://localhost:8000/profile/${email}`,
        method: 'get',
        timeout: 5000,
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Token ${accessKey}`,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.status);
      }
      // Don't forget to return something
      // console.log(res.data);

      console.log(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h3>User Profile </h3>
      <p>{profileEmail}</p>
      {loggedIn === null ? (
        <button onClick={() => logOut()}>Log in</button>
      ) : (
        <button type="button" onClick={() => router.push('/login')}>
          Log out
        </button>
      )}
    </div>
  );
}

export default profile;
