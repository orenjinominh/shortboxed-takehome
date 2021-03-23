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
let parseCBCS = require('../parser/parser.js');

// Post one comic's metadata to database directly using its ID
app.post('/api/cbcs/json/:id', async function(req,res) {
  console.log('inside post');
  
  await parseCBCS(req.params.id)
    .then(result => {
      comicsInfo.create({...result})
        .then(doc => {
          res.send(doc);
        })
        .catch(err=>{
          console.error('error creating doc', err)
          res.status(404);
        })
    })
    .catch(err => {
      console.log('error scraping', err);
    })

});

// Route to drop all the comic metadata in the database
app.delete('/comics/drop', function(req, res) {

  comicsInfo
    .deleteMany({})
    .then(function(res) {
        res.send('all comics metadata deleted');
    })
    .catch(function(err) {
        res.json(err)
    })
});

// Route to retrieve all the comics metadata in the database
app.get('/comics/getAll', function(req, res) {

  comicsInfo
    .find({})
    .then(function(data) {
        res.send(data);
    })
    .catch(function(err) {
        res.json(err)
    })
});

// Route to get comic by ID, if ID does not exist in db- scrape website in real time
app.get('/api/cbcs/json/:id', async function(req, res) {
  console.log('inside get- req params id: ', req.params.id);

  let found = await comicsInfo.exists({comicId: req.params.id});

  if (!found) {
    await parseCBCS(req.params.id)
      .then(result => {
        comicsInfo.create({...result})
          .then(doc => {
            doc = [doc];
            res.status(200).json(doc);
          })
          .catch(err => {
            console.error('error creating doc with parsed data', err)
            res.status(404);
          })
      })
      .catch(err => {
        console.log('error scraping website in real time', err);
      })
  } else {
    comicsInfo.find({comicId: req.params.id}).exec(function(err, result) {
      if (err) {
        console.log('error finding existing comic metadata', err);
      }
      res.status(200).send(result);
    });
  }
});



module.exports = app;

