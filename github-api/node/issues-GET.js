const saveToFile = require('../../common/save-to-file');
const httpRequest = require('../../common/http-request');
const {config} = require('./config');
const url = require('url');

console.log(`This script will get the GitHub issues from a repo\n`);

const requestUrl = url.parse(url.format({
  query: {
    labels: 'FRONTEND_AT,[Type] - Bug',
    sort: 'created',
    direction: 'asc',
    state: 'all',
    per_page: 100
  }
}));

console.log(config, '/repos/' + config.REPO + `/issues?${requestUrl.query}`
);
httpRequest({
  host: config.BASE_GIT_API_HOST,
  port: config.PORT,
  path: '/repos/' + config.REPO + `/issues?${requestUrl.query}`,
  headers: {
    'Authorization': 'token ' + config.PRIVATE_TOKEN,
    'Accept': 'application/vnd.github.symmetra-preview+json'
  },
  method: 'GET',
}, res => {
  console.log(res);
  d = res.map(({number, title, state, labels, assignee}) => ({
    number,
    title,
    state,
    assignee: assignee && assignee.login || '',
    labels: labels.map(l => l.name).join(','),
  }));
  saveToFile(config.REPO.split('/')[1] + '.json', d);
})
