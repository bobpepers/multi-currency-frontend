import React from 'react';
import {
  FormControl,
  TextField,
} from '@mui/material';

function RenderTextField({
  input,
  type,
  meta: {
    touched,
    error,
  },
  label,
}) {
  return (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        variant="outlined"
        fullWidth
      >
        <TextField
          label={label}
          type={type}
          variant="outlined"
          inputProps={{ className: 'outlined-email-field' }}
          {...input}
        />
        {touched && error && <div className="form-error">{error}</div>}
      </FormControl>
    </div>
  )
}

export default RenderTextField;
