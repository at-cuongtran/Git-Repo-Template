const env = require('../../env.json').github;

module.exports.config = {
  PORT: env.PORT || 443,
  BASE_GIT_API_HOST: env.BASE_GIT_API_HOST,
  PRIVATE_TOKEN: env.PRIVATE_TOKEN,
  REPO: env.REPO
}

