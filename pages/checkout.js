import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CartContext } from '../utils/CartContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

import {
  paymentOptions,
  deliveryOptions,
  validationSchema,
  useStyles,
  OrderSubmitHandler,
} from '../components/OrderSupport';

function checkout() {
  const [userEmail, setUserEmail] = React.useState('');
  const [userToken, setUserToken] = React.useState('');
  // get userEmail from localStorage
  React.useEffect(() => {
    const data = window.localStorage.getItem('nextAuthEmail');
    if (data) {
      setUserEmail(data);
    }
  }, []);
  // get user token from localStorage
  React.useEffect(() => {
    const data = window.localStorage.getItem('nextAuthToken');
    if (data) {
      setUserToken(data);
    }
  }, []);

  const router = useRouter();
  const [cartItems, setCartItems] = React.useContext(CartContext);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.075;
  const shippingPrice = itemsPrice > 10000 ? 0 : 200;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  //additional order info not on the order form
  const cartOrderInfo = {
    order_user: userEmail,
    order_items: cartItems,
    order_total_amount: totalPrice,
  };

  const styles = useStyles();
  const formik = useFormik({
    initialValues: {
      receiver_phone: '',
      receiver_email: '',
      order_code: '',
      payment_option: '',
      delivery_option: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const orderData = { ...cartOrderInfo, ...values };
      const accessKey = userToken;
      OrderSubmitHandler(orderData, accessKey);

      alert(JSON.stringify(orderData, null, 2));
      // console.log(orderData);
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <h4>CheckOut Form</h4>

            <p>
              <TextField
                label="Enter receiver Phone Number"
                required
                name="receiver_phone"
                type="number"
                id="receiver_phone"
                value={formik.values.receiver_phone}
                onChange={formik.handleChange}
                error={
                  formik.touched.receiver_phone &&
                  Boolean(formik.errors.receiver_phone)
                }
                helperText="Enter Your Phone Number"
                helperText={
                  formik.touched.receiver_phone && formik.errors.receiver_phone
                }
                variant="outlined"
              />
            </p>
            <p>
              <TextField
                label="Enter receiver Email if Available"
                id="receiver_email"
                name="receiver_email"
                value={formik.values.receiver_email}
                onChange={formik.handleChange}
                error={
                  formik.touched.receiver_email &&
                  Boolean(formik.errors.receiver_email)
                }
                helperText={
                  formik.touched.receiver_email && formik.errors.receiver_email
                }
                variant="outlined"
              />
            </p>
            <p>
              <TextField
                label="Enter 4-6 digit passcode"
                id="order_code"
                name="order_code"
                type="number"
                value={formik.values.order_code}
                onChange={formik.handleChange}
                error={
                  formik.touched.order_code && Boolean(formik.errors.order_code)
                }
                helperText={
                  formik.touched.order_code && formik.errors.order_code
                }
                variant="outlined"
              />
            </p>
            <p>
              <TextField
                label="Select Payment Option"
                select
                id="payment_option"
                name="payment_option"
                value={formik.values.payment_option}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.payment_option
                    ? formik.errors.payment_option
                    : ''
                }
                error={
                  formik.touched.payment_option &&
                  Boolean(formik.errors.payment_option)
                }
                variant="outlined"
                fullWidth
              >
                {paymentOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </p>
            <p>
              <TextField
                label="Delivery Option"
                select
                id="delivery_option"
                name="delivery_option"
                value={formik.values.delivery_option}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.delivery_option
                    ? formik.errors.delivery_option
                    : ''
                }
                error={
                  formik.touched.delivery_option &&
                  Boolean(formik.errors.delivery_option)
                }
                variant="outlined"
                fullWidth
              >
                {deliveryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </p>
          </CardContent>
          <CardActions className={styles.actions}>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default checkout;
