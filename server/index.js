// require('dotenv').config();
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// const cors = require('cors');
// app.use(cors());


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
let parseCBCS = require('../parser/parser.js');

// app.get('/:id', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../public/index.html'));
// });

app.post('/api/cbcs/json/:id', async function(req,res) {
  console.log('inside post');
  
  await parseCBCS(req.params.id)
    .then(result => {
      comicsInfo.create({...result})
        .then(doc => {
          res.send(doc);
        })
        .catch(err=>{
          console.error('error create doc', err)
          res.status(404);
        })
    })
    .catch(err => {
      console.log('error scraping', err);
    })

});

// Route to drop all the comic metadata in the database
app.get('/comics/drop', function(req, res) {

  comicsInfo
    .deleteMany({})
    .then(function(res) {
        res.send('all comics metadata deleted');
    })
    .catch(function(err) {
        res.json(err)
    })
});

app.get('/api/cbcs/json/:id', async function(req, res) {
  console.log('req params id', req.params.id);


  if (comicsInfo.exists({comicId: req.params.id})) {
    comicsInfo
      .findOne({comicId: req.params.id})
      .exec((err, metadata) => {
        if (err) console.log('error here');
        res.status(200).send(metadata);
      });
  } else {
    app.post(`/api/cbcs/json/${req.params.id}`)
  }


});


/* SERVING UP STATIC FILE FOR BUILD */
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = app;

