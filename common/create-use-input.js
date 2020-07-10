const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.createUserInput = function(q, multipleLines) {
  return new Promise((resolve, reject) => {
    // TODO: remove event on resolve
    var response;

    console.log('\x1b[32m%s\x1b[0m', q);
    // rl.setPrompt();
    rl.prompt();

    if (multipleLines) {
      const input = [];
      console.log('\x1b[32m%s\x1b[0m', 'Type exit to finish');
      rl.on('line', function (cmd) {
        if (cmd === 'exit') {
          resolve(input.join('\n'));
          return;
        }
        input.push(cmd);
      });
    } else {
      rl.on('line', (userInput) => {
        response = userInput;
        resolve(response);
        // rl.close();
      });
    }

    rl.on('close', () => {
      resolve(response);
    });
  })
};
