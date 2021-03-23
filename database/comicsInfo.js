const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const comicsInfoSchema = new mongoose.Schema({
  comicId: {type: String, unique: true, dropDups: true},
  title: String,
  publisher: String,
  grade: String
});

const comicsInfo = mongoose.model('comicsInfo', comicsInfoSchema);


module.exports = comicsInfo;
