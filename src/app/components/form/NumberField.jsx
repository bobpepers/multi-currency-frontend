import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

function NumberField({
  input,
  label,
  meta: {
    touched,
    error,
  },
  ...custom
}) {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-adornment-tfa">{label}</InputLabel>
      <OutlinedInput
        label={label}
        fullWidth
        id="outlined-adornment-tfa"
        inputProps={{ className: 'outlined-adornment-tfa' }}
        type="number"
        labelWidth={70}
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    </FormControl>
  )
}

export default NumberField;
