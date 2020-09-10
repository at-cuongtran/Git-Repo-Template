
const httpRequest = require('../../common/http-request');
const {config} = require('./config');

console.log(`This script will DELETE ALL the GitHub labels
I sure hope you know what you are doing`);

const api = (method, id, res, err) => {
  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: config.PORT,
    path: '/repos/' + config.REPO + '/labels' + (id ? `/${id}` : ''),
    headers: {
      'Authorization': 'token ' + config.PRIVATE_TOKEN,
      'Accept': 'application/vnd.github.symmetra-preview+json'
    },
    method: method,
  }, res, err)
}

api('GET', null, res => {
  res.map(v => {
    api('DELETE', encodeURI(v.name));
  })
});
