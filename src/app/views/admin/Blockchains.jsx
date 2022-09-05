import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';

const BlockchainsView = function () {
  console.log('BlockchainsView');

  return (
    <div className="height100 content">
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Placeholder
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default BlockchainsView;
