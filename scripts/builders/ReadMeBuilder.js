class ReadMeBuilder {
  contentStack = [];

  add(str) {
    this.contentStack.push(str);
  }

  build() {
    const contents = this.contentStack.join("\n");
    return contents.split("/Users/keunwoo/Desktop/lazy-blog2/").join("./");
  }
}

module.exports = ReadMeBuilder;
