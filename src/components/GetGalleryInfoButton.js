import React, {
  Fragment
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GetApp from '@material-ui/icons/GetApp';

const GetGalleryInfoButton = ({ handleGetInfo, classes }) => {
  return (
    <Fragment>
      <form onSubmit={e => e.preventDefault()}>
        <Button
          color="primary"
          variant="contained"
          className={classes.getGalleryInfoBtn}
          disabled={false}
          onClick={handleGetInfo}
        >
          <GetApp className={classes.icon} />
          Get Gallery Info
        </Button>
      </form>
    </Fragment>
  );
};

const styles = theme => ({
  getGalleryInfoBtn: {
    margin: '0 0 40px 0',
  },
  icon: {
    marginRight: 5
  },
});

export default withStyles(styles)(GetGalleryInfoButton);
