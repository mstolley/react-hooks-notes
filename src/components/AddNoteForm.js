import React, { Fragment, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

const INITIAL_BLANK_STRING = '';

const AddNoteForm = ({handleAdd, classes}) => {
  // use hooks
  const [contact, setContact] = useState(INITIAL_BLANK_STRING);
  const [subject, setSubject] = useState(INITIAL_BLANK_STRING);
  const [content, setContent] = useState(INITIAL_BLANK_STRING);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleContactChange = event => setContact(event.target.value);
  const handleSubjectChange = event => setSubject(event.target.value);
  const handleContentChange = event => setContent(event.target.value);

  const clearFields = () => {
    setContact(INITIAL_BLANK_STRING);
    setSubject(INITIAL_BLANK_STRING);
    setContent(INITIAL_BLANK_STRING);
  }

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      contact,
      subject,
      content,
      'isFav': false,
      'date': Date.now()
    };
    handleAdd(newNote);
    clearFields();
  }

  useEffect(() => {
    (!!contact && !!subject && !!content) ? setIsFormValid(true) : setIsFormValid(false);
  });

  useEffect(() => {
    (!!contact || !!subject || !!content) ? setIsFormEmpty(false) : setIsFormEmpty(true);
  });

  return (
    <Fragment>
      <form onSubmit={(e) => e.preventDefault()}>
        <Typography component="div" variant="h4">
          Add Note
        </Typography>
        <TextField
          variant="outlined"
          id="contact-field"
          fullWidth
          required
          label="Contact"
          placeholder="Matthew Stolley"
          margin="normal"
          value={contact} 
          name="contact" 
          onChange={handleContactChange}
        />
        <TextField
          variant="outlined"
          id="subject-field"
          fullWidth
          required
          label="Subject"
          placeholder="Subject"
          margin="normal"
          value={subject} 
          name="subject" 
          onChange={handleSubjectChange}
        />
        <TextField
          variant="outlined"
          fullWidth
          required
          multiline
          rows='4'
          id="content-field"
          label="Content"
          placeholder="Content"
          margin="normal"
          value={content} 
          name="content" 
          onChange={handleContentChange}
        />
        <div className={classes.marginTop20}>
          <Button color="default" variant="contained" disabled={isFormEmpty} onClick={clearFields}>
            <ClearIcon />
            Clear
          </Button>
          <Button color="primary" variant="contained" className={classes.floatRight} disabled={!isFormValid} onClick={addNote}>
            <AddIcon />
            Add
          </Button>
        </div>
      </form>       
    </Fragment>
  );
};

const styles = theme => ({
  floatRight: {
    float: 'right'
  },
  marginTop20: {
    marginTop: 16
  },
});

export default withStyles(styles)(AddNoteForm);
