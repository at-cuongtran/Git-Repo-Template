const httpRequest = require('../../common/http-request');
const {createUserInput} = require('../../common/create-use-input');
const { mrTemplate, PRExample } = require('./merge-requests-template');
const { getCurrentBranch, getLastCommit } = require('../../common/git')
const {config} = require('./config');
const {getMe} = require('./user-me-GET');
const {getLabels} = require('./labels-GET');

const main = async () => {

  let labels;
  let myId;

  getLabels().then(v => {
    labels = v;
  })

  getMe().then(v => {
    myId = v.id
  })
  
  const currentBranch = await getCurrentBranch();
  const sourceBranch = await createUserInput('\nSource Branch - default: current branch: ' + currentBranch);

  const targetBranch = await createUserInput(`\ntarget Branch - default: ${config.TARGET_BRANCH}: `);

  const lastCommit = await getLastCommit();
  const title = await createUserInput('\nTitle - default: last commit: ' + lastCommit);
  
  console.log('\n', PRExample, '\n');
  
  const content = await createUserInput('\nContent: ');

  console.log('\nLabels:\n', labels);
  const labelIds = await createUserInput('Label ids, seperate by comma: ');

  const labelsStr = labelIds && labelIds.split(',').map(v => {
    const labelObj = labels.find(l => +l.id === +(v || '').trim())
    return labelObj.name;
  }).join(',') || '';

  console.log(labelsStr);

  console.log('getting user profile...\n');
  console.log('Your id: ', myId);

  const data = {
    id: config.PROJECT_ID,
    source_branch: sourceBranch || currentBranch,
    target_branch: targetBranch || config.TARGET_BRANCH,
    title: title || lastCommit,
    assignee_id: myId,
    description: mrTemplate(content),
    labels: `[Rank] B - Normal,[Status] 03 - Fixed,${labelsStr}`
  }

  console.log(data);

  httpRequest({
    host: config.BASE_GIT_API_HOST,
    port: config.PORT,
    path: `/api/v4/projects/${config.PROJECT_ID}/merge_requests`,
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

  // rl.close()
}

main();
