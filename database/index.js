require('dotenv').config();
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/comicsInfo';

const db = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

const comicsInfo = require('./comicsInfo.js');

module.exports.db = db;