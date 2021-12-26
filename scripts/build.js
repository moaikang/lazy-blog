const fs = require("fs");
const path = require("path");

const TreeBuilder = require("./CategoryBuilder");
const { enter, removeMDPostFix } = require("./utils/Format");
const constants = require("./constants");
const { isDirectory } = require("./utils/File");
const { Footer } = require("./constants");
const IGNORED_DIR_OR_FILE_NAMES = ["assets", ".gitkeep"];

// 우선 먼저 데브모드인지 실제모드인지 확인한다.
const isProduction = process.env.PRODUCTION === "true";

// 데브 모드라면 README-TEST.md 에다 작성하고, 실제 모드라면 README.md 에 작성
const README_PATH = isProduction
  ? path.join(__dirname, "../README.md")
  : path.join(__dirname, "../README_TEST.md");

const isReadMeExist = fs.existsSync(README_PATH);

if (isReadMeExist) {
  fs.unlinkSync(README_PATH);
}

let content = "";

content += enter(constants.Header);

const postsPath = path.join(__dirname, "../posts");
const postsCategories = fs.readdirSync(postsPath);

for (const category of postsCategories) {
  const postCategoryDirName = path.join(postsPath, category);
  const postFileNames = fs.readdirSync(postCategoryDirName);

  const treeBuilder = new TreeBuilder(postCategoryDirName);
  treeBuilder.addCategory(category);

  for (const postFileName of postFileNames) {
    if (IGNORED_DIR_OR_FILE_NAMES.includes(postFileName)) continue;

    const postFilePath = path.join(postCategoryDirName, postFileName);

    if (isDirectory(postFilePath)) {
      const subCategory = postFileName;
      treeBuilder.setSubCategory(subCategory);

      const subPosts = fs.readdirSync(postFilePath);

      for (const subPost of subPosts) {
        const subPostNameWithoutMDPostFix = removeMDPostFix(subPost);
        const title = `[${subCategory}] ${subPostNameWithoutMDPostFix}`;
        treeBuilder.addItem(title);
      }

      treeBuilder.resetSubCategory();
    } else {
      const postNameWithoutMDPostFix = removeMDPostFix(postFileName);
      treeBuilder.addItem(postNameWithoutMDPostFix);
    }
  }

  const treeResult = treeBuilder.build();

  content += enter(treeResult);
}

content += Footer;

// 콘텐트를 찍어낸다.
fs.writeFileSync(README_PATH, content);
