const Header = `# DEV_MOAI 🧑‍💻<br>
`;

const Footer = `
---

<center>
© Keunwoo Kang<br>
  <a target="_blank" href="mailto:moaikang.dev@gmail.com?subject=Hello%20Ileri,%20From%20Github"><img src="https://img.shields.io/badge/gmail-%23D14836.svg?&style=flat-square&logo=gmail&logoColor=white" /></a>
  <br>
</center>
`;

const CategoryHeader = `
<center>
Category
</center>
`.trim();

const buildCategory = (categoryName) => {
  return `
  <details>
    <summary>${categoryName}</summary>
    <div markdown="1">😎숨겨진 내용😎</div>
    <div markdown="2">ㅋㅋ</div>
    <div markdown="2">ㅋㅋ</div>
  </details>
  `.trim();
};

const constants = {
  Header,
  Footer,
  CategoryHeader,
  buildCategory,
};

module.exports = constants;
