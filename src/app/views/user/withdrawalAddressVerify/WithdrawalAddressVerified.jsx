import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

function RegisterVerified() {
  return (
    <div className="content index600 shadow-w text-center content">
      <CheckIcon
        style={{
          color: 'green',
          fontSize: '128px',
        }}
      />
      <h2 className="text-center">Withdrawal Address Verified</h2>
    </div>
  )
}

export default RegisterVerified;
