const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
// const Repo = require('../database/index.js')
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/repos', function (req, res) {
  let username = Object.keys(req.body)[0];
  return new Promise((resolve, reject) => {
    getRepos.getReposByUsername(username, (err, results) => {
      if(err) {
        reject(err);
      } else {
        resolve(results);
      }  
    })
  })
  .then((results) => {
    return db.save(results)
  })
  .then((results)=> {
    res.status(201).end();
  })
  .catch((err) => {
    return err;
  })
});

app.get('/repos', function (req, res) {
  db.Repo.find((err, repos) => {
    if (err) {
      return handleError(err);
    } 
    console.log('Here is the GET: ');
    res.json(repos);
  })
  .limit(25);
      
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

