const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const comicsInfoSchema = new mongoose.Schema({
  comicId: String,
  title: String,
  publisher: String,
  grade: String
});

const comicsInfo = mongoose.model('comicsInfo', comicsInfoSchema);



module.exports = comicsInfo;