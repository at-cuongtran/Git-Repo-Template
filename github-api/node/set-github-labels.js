const labels = require('../git-labels');
const httpRequest = require('./http-request');
const config = require('./env.json');

console.log(`This script will remove the GitHub default labels 
and create the Array Digital process labels for your repo. 
A personal access token is required to access private repos.\n`);

const PORT = config.PORT || 443;

const labelsRequestCommon = (method, data) => {
  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: PORT,
    path: '/repos/' + config.REPO + '/labels',
    headers: {
      'Authorization': 'token ' + config.PRIVATE_TOKEN,
      'user-agent': 'node.js',
    },
    method: method,
    body: data
  })
}

console.log('\ncreating labels...');

labels.map(l => {
  labelsRequestCommon('POST', l);
});
