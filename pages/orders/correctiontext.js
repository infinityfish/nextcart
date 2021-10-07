<TextField
  select
  id="payment_option"
  label="PaymentOption"
  value={values.payment_option}
  onChange={formik.handleChange}
  helperText={touched.payment_option ? errors.payment_option : ''}
  error={touched.payment_option && Boolean(errors.payment_option)}
  margin="dense"
  variant="outlined"
  fullWidth
>
  {paymentOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>;
