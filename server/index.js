require('dotenv').config();
const axios = require('axios');
const path = require('path');


const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// const comicsInfo = require('../database/comicsInfo.js');

// app.use(express.static('dist'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;