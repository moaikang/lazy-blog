const fs = require("fs");
const path = require("path");

const IGNORED_FILES = ["index.js"];

const constantsDirPath = __dirname;
const mdFileMap = {};

const fileNames = fs.readdirSync(constantsDirPath);

fileNames.forEach((fileName) => {
  if (IGNORED_FILES.includes(fileName)) return;

  const mdFileName = fileName;
  const mdFilePath = path.join(constantsDirPath, mdFileName);
  const mdFileContent = fs.readFileSync(mdFilePath, "utf-8");

  Object.assign(mdFileMap, { [mdFileName.replace(".md", "")]: mdFileContent });
});

module.exports = mdFileMap;
