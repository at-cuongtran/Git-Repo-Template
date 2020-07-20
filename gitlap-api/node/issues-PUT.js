// curl "https://git.suke-dachi.jp/api/v4/projects?private_token=CyTL83H4-UooLtqvgwyg"
const httpRequest = require('../../common/http-request');
const {createUserInput} = require('../../common/create-use-input');
const {config} = require('./config');

const url = require('url');

const updateIssues = async () => {
  const issuesStr = await createUserInput('\nIssues to update: ');
  if (!issuesStr) {
    return
  }
  const issues = issuesStr.split(' ').map(v => v.match(/(\d+)/)[0])
  console.log('Updating: ', issues);
  
  issues.map(isu => {
    httpRequest({
      host: config.BASE_GIT_API_HOST,
      port: config.PORT,
      path: `/api/v4/projects/${config.PROJECT_ID}/issues/${isu}`,
      headers: {
        'Private-Token': config.PRIVATE_TOKEN,
        'Content-Type': "application/json"
      },
      method: 'GET',
    }, res => {
      const labels = res.labels.filter(v => {
        return ![
          '[Status] 01 - New',
          '[Status] 02 - In Progress',
          '[Status] 03 - Fixed',
          '[Status] 04 - Reopened'
        ].includes(v)
      }).concat(['[Status] 03 - Fixed']).join(',')
      const requestUrl = url.parse(url.format({
        query: {
          labels
        }
      }));
      console.log(labels);
      
      httpRequest({
        host: config.BASE_GIT_API_HOST,
        port: config.PORT,
        path: `/api/v4/projects/${config.PROJECT_ID}/issues/${isu}?${requestUrl.query}`,
        headers: {
          'Private-Token': config.PRIVATE_TOKEN,
          'Content-Type': "application/json"
        },
        method: 'PUT',
      }, r => {
        console.log('\n\n')
        console.log(r.web_url);
      })
    })
    
  })
}

module.exports = {
  updateIssues
}
