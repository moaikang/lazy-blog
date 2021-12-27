const { enter, removeMDPostFix } = require("./utils/Format");

const UNINITIALIZED_MARKDOWN_VALUE = -1;
const UNINITIALIZED_POSTS_VALUE = "";
const UNINITIALIZED_FILE_PATH_BASE = "";
const UNINITIALIZED_SUB_CATEGORY = "";
const CATEGORY_PREFIX = "### ";

const ERROR_MSG = {
  MISSING_CATEGORY: "You should set category first to build posts",
  MISSING_SUB_CATEGORY: "You should set subCategory first to build posts",
  MISSING_CONTENT: "You should set content to build posts",
};

class PostsBuilder {
  markdownValue = UNINITIALIZED_MARKDOWN_VALUE;
  posts = UNINITIALIZED_POSTS_VALUE;
  filePathBase = UNINITIALIZED_FILE_PATH_BASE;
  subCategory = UNINITIALIZED_SUB_CATEGORY;

  constructor(filePathBase) {
    this.filePathBase = filePathBase;
  }

  addCategory(categoryName) {
    this.posts += enter(CATEGORY_PREFIX + categoryName);
    return this;
  }

  addItem(itemName) {
    if (!this.isCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_CATEGORY);
    }

    this.posts += this.buildAnchorTag(itemName);

    return this;
  }

  addSubItem(itemName) {
    if (!this.isCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_CATEGORY);
    }

    if (!this.isSubCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_SUB_CATEGORY);
    }

    this.posts += this.buildAnchorTag(itemName);
  }

  build() {
    if (!this.isCategoryAdded()) {
      throw new Error(ERROR_MSG.MISSING_CATEGORY);
    }

    this.posts = this.posts.trim();

    return this.posts;
  }

  isCategoryAdded() {
    return this.posts.includes(CATEGORY_PREFIX);
  }

  buildAnchorTag(itemName) {
    if (!this.isSubCategoryAdded()) {
      return (
        `<a href="${this.filePathBase}/${itemName}">${removeMDPostFix(
          itemName
        )}</a>`.trim() + "<br/>"
      );
    } else {
      return (
        `<a href="${this.filePathBase}/${this.subCategory}/${itemName}">[${
          this.subCategory
        }] ${removeMDPostFix(itemName)}</a>`.trim() + "<br/>"
      );
    }
  }

  setSubCategory(subCategory) {
    this.subCategory = subCategory;
  }

  isSubCategoryAdded() {
    return this.subCategory !== UNINITIALIZED_SUB_CATEGORY;
  }

  resetSubCategory() {
    this.subCategory = UNINITIALIZED_SUB_CATEGORY;
  }
}

module.exports = PostsBuilder;
