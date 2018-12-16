const mongoose = require('mongoose');//Include mongoose
mongoose.connect('mongodb://localhost/fetcher');//Establish pending connection with local 'fetcher' db
const Promise = require('bluebird');

const db = mongoose.connection; //create new mongoose connection
db.on('error', console.error.bind(console, 'connections error:'));// let us know if we connected properly
db.once('open', function() {
  console.log('connection successful!');
})

let repoSchema = new mongoose.Schema({ // define our document schema
  user: String,
  name: String,
  full_name: {
    type: String,
    unique: true
  },
  avatar: String,
  created: {
    type: Date,
    default: Date.now()
  },
});

let Repo = mongoose.model('Repo', repoSchema);// Create our model, 'Repo' which will make sure each new document conforms to schema

let save = (data) => {
  let promises = []

  data.forEach(repo => {
    let document = new Repo(repo);

    promises.push(new Promise((resolve, reject) => {
      if (Repo.find({full_name: document.full_name}, (err, result) => { 
        if (err) {
          reject(err);
        } else {
          return result.length === 0;
        }
      })) {
        document.save((err, results) => {
          if (err) {
            reject (err)
          } else {
            resolve (results)
          }
        })
      }
    })
    )
  });
  return Promise.all(promises);
}
module.exports.save = save;
module.exports.Repo = Repo;