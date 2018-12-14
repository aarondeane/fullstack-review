const express = require('express');
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/repos', function (req, res, next) {
  let username = Object.keys(req.body)[0];  
  // TODO - your code here!
  //let data = getRepos.getReposByUsername(username);
  getRepos.getReposByUsername(username, (err, results) => {
    console.log('Here is the data in the server');
  })
  res.status(201).send()
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

