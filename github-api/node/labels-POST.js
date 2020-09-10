const labels = require('../labels');
const httpRequest = require('../../common/http-request');
const {config} = require('./config');

console.log(`This script will add new labels to your repo\n`);

const labelsRequestCommon = (method, data) => {
  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: config.PORT,
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
