
const readline = require('readline');
const httpRequest = require('./http-request');
console.log(`This script will get the GitHub labels from a repo to a JSON file\n`);

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

  api('GET', token, repo, null, res => {
    res.map(v => {
      api('DELETE', token, repo, encodeURI(v.name));
    })
  });
  rl.close()
}

main();

const api = (method, token, repo, id, res, err) => {
  httpRequest({
    host: BASE_GIT_API_HOST,
    port: PORT,
    path: '/repos/' + repo + '/labels' + (id ? `/${id}` : ''),
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github.symmetra-preview+json'
    },
    method: method,
  }, res, err)
}

