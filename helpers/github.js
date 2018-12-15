const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, serverCB) => {
  console.log('get repos invoked', username);
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }
  };

  function callback(err, response) {
    if(err) {
      serverCB(err);
    } else {
      console.log('successful request for data from Github');
      const data = JSON.parse(response.body);
      const dataObj = data.map(obj => {
        let repo = {};
        repo.user = username;
        repo.name = obj.name;
        return repo;
      });        
      serverCB(null, dataObj);
    }
  }

  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;