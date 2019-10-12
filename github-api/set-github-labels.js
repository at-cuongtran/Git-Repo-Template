const labels = require('./git-labels');
const readline = require('readline');
const httpRequest = require('./http-request');

console.log(`This script will remove the GitHub default labels 
and create the Array Digital process labels for your repo. 
A personal access token is required to access private repos.\n`);

const BASE_GIT_API_HOST = 'api.github.com';
const PORT = 443;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const inputToken = () => {
  return new Promise((resolve, reject) => {
    rl.question('\nGitHub Personal Access Token: ', (answer) => {
      resolve(answer);
    })
  })
}

const inputRepo = () => {
  return new Promise((resolve, reject) => {
    rl.question('\nGitHub Org/Repo Example: myname/myproject for https://github.com/myname/myproject: ',
      (answer) => {
      resolve(answer);
    })
  })
}

const main = async () => {
  token = await inputToken();
  repo = await inputRepo()

  createLabels(token, repo);
  rl.close()
}

main();

const createLabels = function(token, repo) {
  console.log('\ncreating labels...');

  labels.map(l => {
    labelsRequestCommon('POST', l);
  });
}

const labelsRequestCommon = (method, data) => {
  httpRequest({
    host: BASE_GIT_API_HOST,
    port: PORT,
    path: '/repos/' + repo + '/labels',
    headers: {
      'Authorization': 'token ' + token,
      'user-agent': 'node.js',
    },
    method: method,
    body: data
  })
}
