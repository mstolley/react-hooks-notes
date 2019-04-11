import React from 'react';
import Typography from '@material-ui/core/Typography';

const ComponentHeader = (props) => {
  return (
    <Typography component="div" variant="h4">
      {props.children}
    </Typography>
  );
};

export default (ComponentHeader);