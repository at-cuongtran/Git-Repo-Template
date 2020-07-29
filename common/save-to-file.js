const fs = require('fs');

const saveToFile = (filename, data) => {
  try {
    fs.unlinkSync(filename);
  } catch (e) {
    
  }
  fs.appendFile(filename, JSON.stringify(data, null, 2), function (err) {
    if (err) throw err;
    // console.log('Saved!');
  });
}

module.exports = saveToFile
