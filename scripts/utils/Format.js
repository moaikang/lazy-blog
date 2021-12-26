function br(str) {
  return str + "<br>";
}

function enter(str) {
  return str + "\n";
}

function removeMDPostFix(fileName) {
  return fileName.replace(".md", "");
}

const format = {
  br,
  enter,
  removeMDPostFix,
};

module.exports = format;
