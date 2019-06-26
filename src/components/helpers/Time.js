import React, { Fragment } from 'react';

const Time = ({type, date}) => {

  if(type === 'date') {
    date = new Date(date).toDateString();
  } else if(type === 'time') {
    date = new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
  } else {
    date = new Date(date).toLocaleString();
  }

  return (
    <Fragment>
      {date}
    </Fragment>
  );
};

export default (Time);
