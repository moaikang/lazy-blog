const fs = require("fs");

function isDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

const file = {
  isDirectory,
};

module.exports = file;
