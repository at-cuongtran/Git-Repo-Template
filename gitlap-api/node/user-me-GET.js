const httpRequest = require('../../common/http-request');
const {config} = require('./config');

async function getMe() {
  return new Promise((r, j) => {
    httpRequest({
      host: config.BASE_GIT_API_HOST,
      port: config.PORT,
      path: `/api/v4/user`,
      headers: {
        'Private-Token': config.PRIVATE_TOKEN,
        'Content-Type': "application/json"
      },
      method: 'GET',
    }, res => {
      r(res)
    })
  })
  
}

module.exports = {
  getMe
}
