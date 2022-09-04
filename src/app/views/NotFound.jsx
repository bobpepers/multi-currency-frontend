import React from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';

const NotFoundView = function () {
  console.log('Not Found');

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
            Page Not Found!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default NotFoundView;
