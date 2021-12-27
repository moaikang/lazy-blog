const path = require("path");

class ReadMeBuilder {
  contentStack = [];

  add(str) {
    this.contentStack.push(str);
  }

  build() {
    const contents = this.contentStack.join("\n");
    const rootAbsolutePath = path.join(__dirname, "../", "../");

    return contents.split(rootAbsolutePath).join("./");
  }
}

module.exports = ReadMeBuilder;
