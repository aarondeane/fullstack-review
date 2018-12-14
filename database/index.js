const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connections error:'));
db.once('open', function() {
  console.log('connection successful!');
})

let repoSchema = new mongoose.Schema({
  id: Int,
  name: String,
  full_name: String,
  data: String, // takes in full response object to get _url later
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;