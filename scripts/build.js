const fs = require("fs");
const path = require("path");

const ReadMeBuilder = require("./builders/ReadMeBuilder");
const PostsBuilder = require("./builders/PostsBuilder");
const { isDirectory } = require("./utils/File");
const constants = require("./constants");

const IGNORED_DIR_OR_FILE_NAMES = ["assets", ".gitkeep"];
const isProduction = process.env.PRODUCTION === "true";

const README_PATH = isProduction
  ? path.join(__dirname, "../README.md")
  : path.join(__dirname, "../README_TEST.md");

const isReadMeExist = fs.existsSync(README_PATH);

if (isReadMeExist) {
  fs.unlinkSync(README_PATH);
}

const readMeBuilder = new ReadMeBuilder();
readMeBuilder.add(constants.Header);

const postsPath = path.join(__dirname, "../posts");
const postsCategories = fs.readdirSync(postsPath);

for (const category of postsCategories) {
  const postCategoryDirName = path.join(postsPath, category);
  const postFileNames = fs.readdirSync(postCategoryDirName);
  const postsBuilder = new PostsBuilder(postCategoryDirName);

  postsBuilder.addCategory(category);

  for (const postFileName of postFileNames) {
    if (IGNORED_DIR_OR_FILE_NAMES.includes(postFileName)) continue;

    const postFilePath = path.join(postCategoryDirName, postFileName);

    if (isDirectory(postFilePath)) {
      const subCategory = postFileName;
      postsBuilder.setSubCategory(subCategory);

      const subPostNames = fs.readdirSync(postFilePath);

      for (const subPostName of subPostNames) {
        postsBuilder.addSubItem(subPostName);
      }

      postsBuilder.resetSubCategory();
    } else {
      postsBuilder.addItem(postFileName);
    }
  }

  const posts = postsBuilder.build();

  readMeBuilder.add(posts);
}

readMeBuilder.add(constants.Footer);
const content = readMeBuilder.build();

fs.writeFileSync(README_PATH, content);
