const { enter } = require("./utils/Format");

const UNINITIALIZED_MARKDOWN_VALUE = -1;

const ERROR_MSG = {
  MISSING_CATEGORY: "You should set category first to build tree",
  MISSING_CONTENT: "You should set content to build tree",
};

class TreeBuilder {
  markdownValue = UNINITIALIZED_MARKDOWN_VALUE;
  tree = "";
  filePathBase = null;
  subCategory = "";

  constructor(filePathBase) {
    this.filePathBase = filePathBase;
  }

  addCategory(categoryName) {
    this.tree += enter(`### ${categoryName}`);
    return this;
  }

  addItem(itemName, displayName = null) {
    if (!this.isCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_CATEGORY);
    }

    this.tree += this.buildAnchorTag(itemName, displayName);

    return this;
  }

  build() {
    if (!this.isCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_CATEGORY);
    }

    this.tree = this.tree.trim();

    return this.tree;
  }

  isCategoryAdded() {
    return this.tree.includes("### ");
  }

  buildAnchorTag(itemName, displayName) {
    return (
      `<a href="${this.filePathBase}/${formatSubCategory(
        this.subCategory
      )}${itemName}.md">${displayName ?? itemName}</a>`.trim() + "<br/>"
    );
  }

  setSubCategory(subCategory) {
    this.subCategory = subCategory;
  }

  resetSubCategory() {
    this.subCategory = "";
  }
}

function formatSubCategory(subCategory) {
  if (subCategory !== "") {
    return subCategory + "/";
  } else {
    return "";
  }
}

module.exports = TreeBuilder;
