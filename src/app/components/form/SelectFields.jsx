import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';

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
  console.log(children);
  return (
    <FormControl className="admin-form-field" style={{ width: '100%' }}>
      <InputLabel error={touched && error}>{label}</InputLabel>
      <Select
        style={{ width: '100%' }}
        floatingLabelText={label}
        error={touched && error}
        {...input}
        {...custom}
      >
        {children}
      </Select>
      <FormHelperText error={touched && error}>{error}</FormHelperText>
    </FormControl>
  )
}

SelectField.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default SelectField;
