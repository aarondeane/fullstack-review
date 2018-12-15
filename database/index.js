const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connections error:'));
db.once('open', function() {
  console.log('connection successful!');
})

let repoSchema = new mongoose.Schema({
  name: String,
  full_name: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (error, repo) => {
  // TODO: Your code here
  if (err) {
    throw err;
  } else {
    console.log('Hi from the DB');
  }
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;