
const simpleGit = require('simple-git');

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
};
const git = simpleGit(options);

async function getCurrentBranch() {
  const status = await git.status();
  return status.current;
}

async function getLastCommit() {
  const log = await git.log();
  return log.latest.message;
}

module.exports = {
  getCurrentBranch,
  getLastCommit
}