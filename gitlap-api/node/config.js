const env = require('../env.json');

module.exports.config = {
  PROJECT_ID: encodeURIComponent(env.PROJECT_ID),
  PORT: env.PORT || 443,
  BASE_GIT_API_HOST: env.BASE_GIT_API_HOST,
  PRIVATE_TOKEN: env.PRIVATE_TOKEN,
  TARGET_BRANCH: env.TARGET_BRANCH
}
