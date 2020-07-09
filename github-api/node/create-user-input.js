const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const createUserInput = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question,
      (answer) => {
      resolve(answer);
    })
  })
}

module.exports = {
  createUserInput
}
