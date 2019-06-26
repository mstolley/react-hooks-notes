import React, {
  Fragment,
  useState
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Alert = ({ type, message='Something went wrong...', classes }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <Fragment>
      <div className={classes.alert}>
        {message}
      </div>

      <Snackbar
        className={classes.alert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={`<span id="message-id">${message}</span>`}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Fragment>
  );
};

const styles = theme => ({
  alert: {
    marginTop: 100,
    textAlign: 'center'
  }
});

export default withStyles(styles)(Alert);
