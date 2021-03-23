import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

const getId = () => {
  let url = window.location.href;
  if (url[url.length - 1] === '/') {
    //defaults to first comic sample
    var id = '21-04D753B-004';
  } else {
    id = url.slice(-14);
  }

  console.log('id is here', id);
  return id;

};

ReactDOM.render(<App id={getId()}/>, document.getElementById('root'));


