import React, { useState, useEffect } from 'react';
import GetDataApi from './components/helpers/GetDataApi'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GetGalleryInfoButton from './components/GetGalleryInfoButton.js';
import UpdateGalleryInfoForm from './components/UpdateGalleryInfoForm.js';
import Loader from './components/helpers/Loader';
import Alert from './components/helpers/Alert';

const App = ({ classes }) => {
  const [galleries, setGalleries] = useState([]);
  const [{ data, isLoading, isError }, doFetch] = GetDataApi();

  const handleAdd = (galleryUpdate) => {
    setGalleries(galleryUpdate);
    console.log('* handleAdd called: ', galleryUpdate);
  };

  const handleGetInfo = () => {
    doFetch(`htetp://hn.algolia.com/api/v1/search?query=poop`);
    console.log('* data: ', data);
  };

  useEffect(() => {
    console.log('* useEffect: ', galleries);
  }, [galleries]);

  useEffect(() => {
    console.log('* useEffect (componentDidMount)');
  }, []);

  return (
    <div className={classes.root}>
      
        {isError && (
          <Alert type='error' />
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={24}>
            <Grid item md={12} sm={12} xs={12}>
              <GetGalleryInfoButton handleGetInfo={handleGetInfo} />
              <UpdateGalleryInfoForm handleAdd={handleAdd} />
            </Grid>
          </Grid>
        )}
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1280,
    minWidth: 360,
    margin: '0 auto',
    padding: 40
  }
});

export default withStyles(styles)(App);
