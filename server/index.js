const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
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
  })
  .then((results) => {
    res.statusCode(201).send();
  })
  
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

