const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connections error:'));
db.once('open', function() {
  console.log('connection successful!');
})

let repoSchema = new mongoose.Schema({
  user: String,
  name: String,
  updated: {
    type: Date,
    default: Date.now()
  },
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  data.forEach(repo => {
    let document = new Repo(repo);
    document.save((err) => {
      if(err) return handleError(err);
    })
  });
}

module.exports.save = save;