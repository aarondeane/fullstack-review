const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  console.log('get repos invoked', username);
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(err, response) {
    if(err) {
      console.log(err);
    }else{
      console.log('successful request for data from Github');
      let data = JSON.parse(response.body);
      let dataObj = data.map(obj => {
        let repo = {
            id: obj.id,
            name: obj.name,
            full_name: obj.full_name,
            }
          return repo;
          });        
      callback(dataObj);
    }
  }

  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;