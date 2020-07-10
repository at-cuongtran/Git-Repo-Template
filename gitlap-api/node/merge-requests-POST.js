const httpRequest = require('../../common/http-request');
const config = require('../env.json');
const {createUserInput} = require('../../common/create-use-input');
const { mrTemplate, PRExample } = require('./merge-requests-template');
const { getCurrentBranch, getLastCommit } = require('../../common/git')

const PORT = config.PORT || 443;
const assigneeID = 127 // me

const labelsMapping = {
  1: '[Type] 01 - Feature',
  2: '[Type] 03 - Bug'
}

const main = async () => {
  const currentBranch = await getCurrentBranch();
  const sourceBranch = await createUserInput('\nSource Branch - default: current branch: ' + currentBranch);

  const targetBranch = await createUserInput('\ntarget Branch - default: develop: ');

  const lastCommit = await getLastCommit();
  const title = await createUserInput('\nTitle - default: last commit: ' + lastCommit);
  
  console.log('\n', PRExample, '\n');
  
  const content = await createUserInput('\nContent: ');
  
  console.log('\nLabels:\n', labelsMapping);
  const label = await createUserInput('(1 or 2) - default: 2: ');

  const data = {
    id: config.PROJECT_ID,
    source_branch: sourceBranch || currentBranch,
    target_branch: targetBranch || 'develop',
    title: title || lastCommit,
    assignee_id: assigneeID,
    description: mrTemplate(content),
    labels: `[Rank] B - Normal,[Status] 03 - Fixed,${labelsMapping[label || 1]}`
  }

  console.log(data);

  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: PORT,
    path: '/api/v4/projects/50/merge_requests',
    headers: {
      'Private-Token': config.PRIVATE_TOKEN,
      'Content-Type': "application/json"
    },
    method: 'POST',
    body: data
  }, res => {
    console.log(res);
    console.log('\n\n\n\n')
    console.log(res.web_url);
  })

  rl.close()
}

main();
