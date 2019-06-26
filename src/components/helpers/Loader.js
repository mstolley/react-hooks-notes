import React, {
  Fragment
} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const Loader = ({ classes }) => {
  return (
    <Fragment>
      <div className={classes.loader}>
        <CircularProgress className={classes.progress} />
      </div>
    </Fragment>
  );
};

const styles = theme => ({
  loader: {
    marginTop: 100,
    textAlign: 'center'
  },
  progress: {
    display: 'inline-block'
  },
});

export default withStyles(styles)(Loader);
