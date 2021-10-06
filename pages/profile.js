import React from 'react';

import { CartContext } from '../utils/CartContext';
import { useRouter } from 'next/router';
import axios from '../utils/axios';

function profile() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = React.useContext(CartContext);

  React.useEffect(() => {
    const accessKey = window.localStorage.getItem('nextAuthToken');
    // const data = fromStorage && JSON.parse(fromStorage);
    if (accessKey !== null) {
      // get to api to get profile
      console.log(accessKey);
      getProfile(accessKey).then((res) => console.log(res));
    }
  }, []);

  async function getProfile(accessKey) {
    try {
      let res = await axios({
        url: 'http://localhost:8000/profile/',
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
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
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
