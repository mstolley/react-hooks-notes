import React, {
  Fragment,
  useState,
  useEffect,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import BackupIcon from '@material-ui/icons/Backup';
import ComponentHeader from './ComponentHeader.js'

const INITIAL_BLANK_STRING = '';

const UpdateGalleryInfoForm = ({ handleAdd, classes }) => {
  // use hooks
  const [content, setContent] = useState(INITIAL_BLANK_STRING);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleContentChange = event => setContent(event.target.value);

  const clearFields = () => {
    setContent(INITIAL_BLANK_STRING);
  }

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      content,
      'date': Date.now(),
    };
    handleAdd(newNote);
    clearFields();
  }

  useEffect(() => {
    !!content ? setIsFormValid(true) : setIsFormValid(false);
  });

  useEffect(() => {
    !!content ? setIsFormEmpty(false) : setIsFormEmpty(true);
  });

  return (
    <Fragment>
      <form onSubmit={e => e.preventDefault()}>
        <ComponentHeader>Update Gallery Info</ComponentHeader>
        <TextField
          type="file"
          variant="outlined"
          fullWidth
          required
          id="content-field"
          margin="normal"
          value={content}
          name="content"
          onChange={handleContentChange}
        />
        <div className={classes.marginTop20}>
          <Button
            color="default"
            variant="contained"
            disabled={isFormEmpty}
            onClick={clearFields}
          >
            <ClearIcon className={classes.icon} />
            Clear
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.floatRight}
            disabled={!isFormValid}
            onClick={addNote}
          >
            <BackupIcon className={classes.icon} />
            Update
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

const styles = theme => ({
  floatRight: {
    float: 'right',
  },
  marginTop20: {
    marginTop: 20,
  },
  icon: {
    marginRight: 5
  },
});

export default withStyles(styles)(UpdateGalleryInfoForm);
