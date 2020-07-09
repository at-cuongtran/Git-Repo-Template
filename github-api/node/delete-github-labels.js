
const httpRequest = require('./http-request');
const config = require('./env.json');
const PORT = config.PORT || 443;

console.log(`This script will DELETE all the GitHub labels\n`);

const api = (method, id, res, err) => {
  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: PORT,
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
