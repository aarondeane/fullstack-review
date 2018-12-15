const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
// const Repo = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/repos', function (req, res, next) {
  let username = Object.keys(req.body)[0];
  let data = new Promise((resolve, reject) => {
    getRepos.getReposByUsername(username, (err, results) => {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }  
    })
  })
  .then((results) => {
    db.save(results);
    res.status(201).end(results);
  })
  .catch((error) => {
    return handleError(error);
  })

});

app.get('/repos', function (req, res) {
  db.Repo.find((err, repos) => {
    if (err) {
      return handleError(err);
    } 
    console.log('Here is the GET: ');
    res.json(repos);
  });
      
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

