const mongoose = require('mongoose');//Include mongoose
mongoose.connect('mongodb://localhost/fetcher');//Establish pending connection with local 'fetcher' db

const db = mongoose.connection; //create new mongoose connection
db.on('error', console.error.bind(console, 'connections error:'));// let us know if we connected properly
db.once('open', function() {
  console.log('connection successful!');
})

let repoSchema = new mongoose.Schema({ // define our document schema
  user: String,
  name: String,
  avatar: String,
  created: {
    type: Date,
    default: Date.now()
  },
});

let Repo = mongoose.model('Repo', repoSchema);// Create our model, 'Repo' which will make sure each new document conforms to schema

let save = (data) => {
  data.forEach(repo => {
    let document = new Repo(repo);
    document.save((err) => {
      if(err) return handleError(err);
    })
  });
}


module.exports.save = save;
module.exports.Repo = Repo;