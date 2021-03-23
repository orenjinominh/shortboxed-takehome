const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/comicsMetadata';

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true
});

// const comicsInfo = require('./comicsInfo.js');

module.exports.db = db;