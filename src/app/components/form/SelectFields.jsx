import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';

function SelectField({
  input,
  label,
  meta: {
    touched,
    error,
  },
  children,
  ...custom
}) {
  return (
    <FormControl className="admin-form-field" style={{ width: '100%' }}>
      <InputLabel error={touched && error}>{label}</InputLabel>
      <Select
        style={{ width: '100%' }}
        floatingLabelText={label}
        error={touched && error}
        {...input}
        children={children}
        {...custom}
      />
      <FormHelperText error={touched && error}>{error}</FormHelperText>
    </FormControl>
  )
}

export default SelectField;
