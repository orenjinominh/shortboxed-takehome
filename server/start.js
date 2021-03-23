
// require('dotenv').config();

const app = require('./index.js');

const port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});