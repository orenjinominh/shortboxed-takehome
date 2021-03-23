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
  
  await parseCBCS(`https://www.cbcscomics.com/grading-notes/${req.params.id}`)
    .then(result => {
      console.log('inside then block');

    })
    .catch(err => {
      console.log('error scraping', err);
    })

  // comicsInfo.insertOne({metaData}).exec((err, data) => {
  //   if (err) {
  //     console.error('error inserting new ID into db', err);
  //   } else {
  //     console.log('success inserting into db', data);
  //   }
  // });


});

app.get('/api/cbcs/json/:id', function(req, res) {
  console.log('req params id', req.params.id);

  comicsInfo
    .find({})
    .exec((err, data) => {
      console.log('data should be here', data);
      if (err) console.error('cannot find all', err);
      res.json(data);
    });

  // finds only one matching comic
  // comicsInfo
  //   .find({'comicId': req.params.id})
  //   .exec((err, metadata) => {
  //     console.log('inside comic model', metadata);

  //     if (err) {
  //       console.log('inside err message for unfound id in db');
  //     }
  //     res.status(200).json(metadata);
  //   });


  // let idString = JSON.stringify(req.params.id);
  // console.log('idstring here', idString);
  // try {
  //   console.log('inside axios block');
  //   axios.get(`http://localhost:3000/api/cbcs/json/${req.params.id}`)
  //     .then(info => {
  //       console.log('inside then block info', info.data);
  //       res.status(200).send(info);
  //       // comicsInfo
  //       //   .find({'comicId': info.data.comicId})
  //       //   .exec((err, metadata) => {
  //       //     console.log('inside comic model');

  //       //     if (err) {
  //       //       console.log('inside err message for unfound id in db');
  //       //     }
  //       //     res.status(200).json(metadata);
  //       //     next();
  //       //     // res.status(200).send(data);
  //       //   })
  //     })
  //     .catch(err => {
  //       console.log('Error running db query', err);
  //     })

  // } catch(err) {
  //   console.error('oopsies', err);
  // }


});
  // comicsInfo.find({comicId: idString}).exec((err, data) => {
  //   console.log('inside comic model id string', idString);
  //   if (err) {
  //     console.log('inside err message for unfound id in db');

      // parseCBCS('https://www.cbcscomics.com/grading-notes/' + idString)
      //   .then(metaData => {
      //     console.log('inside metadata chain to to inserted', metaData);

      //     comicsInfo.insertOne({metaData}).exec((err, data) => {
      //       if (err) {
      //         console.error('error inserting new ID into db', err);
      //       } else {
      //         console.log('success inserting into db', data);
      //       }
      //     });

      //     res.status(200).json(metaData);
      //   })
      //   .catch(err =>{
      //     console.error('Failed to run crawler on given ID', err);
      //   });
    // }
    // console.log('data found', data);
    // res.status(200).send(data);
//   })
// });

/* SERVING UP STATIC FILE FOR BUILD */
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

module.exports = app;