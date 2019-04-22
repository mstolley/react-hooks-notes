import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddNoteForm from './components/AddNoteForm.js';
import NoteList from './components/NoteList.js';
import localStorage from 'local-storage';

const App = ({classes}) => {
  const [notes, setNotes] = useState([]);

  const handleAdd = (newNote) => {
    setNotes(sortByDate([...notes, newNote]));
  };

  const handleNotesUpdate = (updatedNotes) => {
    setNotes([...updatedNotes]);
  }

  const sortByDate = (list) => {
    return list.sort((a, b) => (a.date < b.date) ? 1 : -1);
  }

  useEffect(() => {
    !!notes && !!notes.length > 0 && localStorage.set('notes', notes);
  }, [notes]);

  useEffect(() => {
    const storedNotes = localStorage.get('notes');
    !!storedNotes && storedNotes.length > 0 && setNotes(storedNotes);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item md={9} sm={12} xs={12}  className={classes.noteContainer}>
          <NoteList notes={notes} handleNotesUpdate={handleNotesUpdate} />
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <AddNoteForm handleAdd={handleAdd} />
        </Grid>
      </Grid>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1280,
    minWidth: 360,
    margin: 24,
  },
  noteContainer: {
    overflowY: 'hidden',
  },
});

export default withStyles(styles)(App);
