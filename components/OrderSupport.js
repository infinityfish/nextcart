import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import axios from '../utils/axios';

import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

import { CartContext } from '../utils/CartContext';

export const paymentOptions = [
  {
    value: 'USDC',
    label: 'USDC Digital Dollar payment',
  },
];
export const deliveryOptions = [
  {
    value: 'pickup',
    label: 'In-Store Pickup',
  },
];
export const validationSchema = yup.object({
  receiver_phone: yup
    .number('Enter receiver phone number')
    .positive()
    .integer()
    .required('Receiver phone number is required'),
  receiver_email: yup
    .string('Enter receiver email')
    .email('Enter a valid email'),
  order_code: yup
    .number('Enter a 4-6 digit passcode for your order receiver')
    .required()
    .positive()
    .integer()
    .min(1111)
    .max(999999),
  payment_option: yup.string().min(3),
  delivery_option: yup.string().min(3),
});

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

export async function OrderSubmitHandler(orderData, accessKey) {
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

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  social: {
    marginTop: 20,
    marginLeft: 10,
  },
  card: {
    maxWidth: 500,
    marginTop: 50,
  },
  cardContent: {
    maxWidth: 500,
  },
  container: {
    display: 'Flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
