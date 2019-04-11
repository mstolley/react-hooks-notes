import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import Time from './Time.js';
import ComponentHeader from './ComponentHeader.js'
import ReactMarkdown from 'react-markdown';

const FilterList = ({filterType, handleFilterTypeChange, filter, handleFilterChange, classes}) => {
  return (
    <div className={classes.marginTop}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="filter-type">Type</InputLabel>
        <Select
          value={filterType}
          onChange={handleFilterTypeChange}
          input={
            <OutlinedInput
            id="filter-type"
            name="filter-type"
            labelWidth={36}
            />
          }
        >
          <MenuItem value="subject">Subject</MenuItem>
          <MenuItem value="contact">Contact</MenuItem>
          <MenuItem value="content">Content</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        id="notesFilterField"
        label="Filter"
        placeholder="Filter Notes"
        className={classes.textField}
        margin="none"
        value={filter}
        name="filter"
        onChange={handleFilterChange}
      />
    </div>
  )
}

const DisplayList = ({classes, notes, filterType, filter, favNote, deleteNote}) => {
  return (
    <List className={classes.scroller}>
      {notes
        .filter(note => note[filterType].toLowerCase().includes(filter.toLowerCase()))
        .map((note, index) =>
        <ListItem key={index} className={`${classes.listItem} ${note.isFav ? 'fav' : ''}`}>
          <div className={classes.listHeader}>
            <div>
              <Typography component="h5" variant="h5" color="textPrimary">
                {note.subject}
              </Typography>
              <Typography component="h6" variant="subtitle1" color="textPrimary">
                {note.contact}
              </Typography>
            </div>
            <div className={classes.listActions}>
              {note.isFav ? (
                <IconButton aria-label="Favorite Selected" value={index} onClick={favNote}>
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton aria-label="Favorite" value={index} onClick={favNote}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}
              <IconButton aria-label="Delete" value={index} onClick={deleteNote}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>

          <div className={classes.dateTime}>
            <Typography component="span" color="textSecondary">
              <Time type="date" date={note.date} />
            </Typography>
            <Typography component="span" color="textSecondary">
              <Time type="time" date={note.date} />
            </Typography>
          </div>

          <ReactMarkdown source={note.content} />
        </ListItem>
      )}
    </List>
  )
}

const NoteList = ({notes, handleNotesUpdate, classes}) => {
  const isLargeView = useMediaQuery('(min-width:960px)');

  // use hooks
  const [filterType, setFilterType] = useState('subject');
  const [filter, setFilter] = useState('');
  
  const handleFilterTypeChange = event => setFilterType(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const deleteNote = (event) => {
    const noteIndex = event.currentTarget.value;
    const filteredNotes = notes.filter((_, index) => index !== parseInt(noteIndex));
    handleNotesUpdate(filteredNotes);
  }

  const favNote = (event) => {
    const noteIndex = event.currentTarget.value;
    const updatedNotes = notes.map((note, i) => {
      if (i === parseInt(noteIndex)) {
        const isFav = note.isFav = !note.isFav;
        return {...note, isFav};
      } else {
        return note;
      }
    });
    handleNotesUpdate(updatedNotes);
  }

  return (
    <Fragment>
      {!!notes && notes.length > 0 ? (
        <div className={(isLargeView ? classes.flexFullContainer : classes.flexContainer)} >
          <div className={classes.headerContainer}>
            <ComponentHeader>Notes</ComponentHeader>
            <FilterList 
              filterType={filterType}
              handleFilterTypeChange={handleFilterTypeChange}
              filter={filter}
              handleFilterChange={handleFilterChange}
              classes={classes}
            />
          </div>
          <DisplayList
            classes={classes}
            notes={notes}
            filterType={filterType}
            filter={filter}
            favNote={favNote}
            deleteNote={deleteNote}
          />
        </div>
      ) : (
        <Typography component="div" variant="h6">
          There are currently no notes to display.
        </Typography>
      )}
    </Fragment>
  );
};

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 472px)' // < 960
  },
  flexFullContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 60px)', // >= 960 width
  },
  headerContainer: {
    order: 1,
    flexShrink: 0,
    flexBasis: 39,
    paddingBottom: 20
  },
  scroller: {
    order: 2,
    overflowY: 'scroll',
    border: 'solid 1px #e0e0e0',
    borderRadius: 4,
    transitionDuration: '.3s',

    '&:hover': {
      borderColor: "#212121",
    }
  },
  listItem: {
    transitionDuration: '1s',
    alignItems: 'flex-start',
    flexDirection: 'column',

    '&:nth-of-type(even)': {
      backgroundColor: "#eee",

      '&.fav': {
        backgroundColor: '#e2da8c'
      }
    },

    '&.fav': {
      backgroundColor: '#fff5a0'
    }
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateTime: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16
  },
  listActions: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    padding: '0 6px'
  },
  marginTop: {
    marginTop: 16
  },
});

export default withStyles(styles)(NoteList);
