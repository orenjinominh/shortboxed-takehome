// require('dotenv').config();
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* IMPORT DB MODEL AND PARSE FUNC */
const comicsInfo = require('../database/comicsInfo.js');
const parseCBCS = require('../parser/parse.js');


/* GET CBCS DATA BY ID
- search in MongodB
  - if error, run parse script and add to dB
  - otherwise if id matches, return json of data
- return res.json of data   

*/



app.get('/api/cbcs/json/:id', function(req, res, next = () => {}) {
  let comicMetadataPreParsed = {
    id: JSON.stringify(req.params.id),
    title: '',
    publisher: '',
    grade: ''
  };

  // might not need this 
  // comicMetadata.id = req.params.id;

  comicsInfo.find({id: req.params.id}).exec((err, data) => {
    if (err) {
      parseCBCS(`https://www.cbcscomics.com/grading-notes/${req.params.id}`, comicMetadataPreParsed)
        .then(data => {
          // parse in real time from website 
          console.log('parsed data is here', data);

        })
        .catch(err =>{
          console.error('Failed to parse info from website', err);
        });

      return console.error('could not retrieve by that ID. See error code: ', err);
    }

    res.status(200).json(data);
    next();
  })
});

/* SERVING UP STATIC FILE FOR BUILD */
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = app;