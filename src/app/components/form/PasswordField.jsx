import React from 'react';
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

function RenderPasswordField({
  input,
  meta: {
    touched,
    error,
  },
  handleClickShowPassword,
  mvalues,
  handleChange,
  handleMouseDownPassword,
  label,
}) {
  return (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <FormControl
        variant="outlined"
        fullWidth
      >
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          label={label}
          inputProps={{ className: 'outlined-adornment-password' }}
          type={mvalues.showPassword ? 'text' : 'password'}
          value={mvalues.password}
          onChange={handleChange('password')}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {mvalues.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )}
          {...input}
        />
      </FormControl>
      {touched && error && <div className="form-error">{error}</div>}
    </div>
  )
}

export default RenderPasswordField;
