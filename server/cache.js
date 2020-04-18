const fs = require('fs');

const fileCache = {};

function getFileFromCache (filename, cb) {
  if (fileCache[filename]) {
    return cb(null, fileCache[filename]);
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      return cb(err);
    }
    fileCache[filename] = data;
    return cb(null, data);
  });
};

module.exports = getFileFromCache;
