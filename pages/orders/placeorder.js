import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

const paymentOptions = [
  {
    value: 'USDC',
    label: 'USDC Digital Dollar payment',
  },
];
const deliveryOptions = [
  {
    value: 'pickup',
    label: 'In-Store Pickup',
  },
];
const validationSchema = yup.object({
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
    .min(4)
    .max(999999),
  payment_option: yup.string().min(3),
  delivery_option: yup.string().min(3),
});

const placeorder = () => {
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
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
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
};
const useStyles = makeStyles((theme) => ({
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
    float: 'left',
  },
}));
export default placeorder;
