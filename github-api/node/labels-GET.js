const saveToFile = require('../../common/save-to-file');
const httpRequest = require('../../common/http-request');
const {config} = require('./config');

console.log(`This script will get the GitHub labels from a repo to a JSON file\n`);

httpRequest({
  host: config.BASE_GIT_API_HOST,
  port: config.PORT,
  path: '/repos/' + config.REPO + '/labels',
  headers: {
    'Authorization': 'token ' + config.PRIVATE_TOKEN,
    'Accept': 'application/vnd.github.symmetra-preview+json'
  },
  method: 'GET',
}, res => {
  d = res.map(({name, color, description}) => ({name, color, description}));
  saveToFile(config.REPO.split('/')[1] + '.json', d);
})
