const fs = require('fs');

const saveToFile = (filename, data) => {
  fs.unlinkSync(filename);
  fs.appendFile(filename, JSON.stringify(data, null, 2), function (err) {
    if (err) throw err;
    // console.log('Saved!');
  });
}

module.exports = saveToFile
