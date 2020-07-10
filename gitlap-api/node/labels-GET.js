const httpRequest = require('../../common/http-request');
const config = require('../env.json');
const PORT = config.PORT || 443

function getLabels() {
  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: PORT,
    path: '/api/v4/projects/50/labels',
    headers: {
      'Private-Token': config.PRIVATE_TOKEN,
      'Content-Type': "application/json"
    },
    method: 'GET',
  }, res => {
    console.log(res.map(({id, name}) => ({id, name})));
  })
}

getLabels();
