const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const comicsInfoSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  grade: Number
});

const comicsInfo = mongoose.model('SimilarProperties', comicsInfoSchema);



module.exports = comicsInfo;