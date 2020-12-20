// test("测试文件名生成", () => {
//   const src = new (require("../index"))();
//   const ret = src.getTestFileName("/abc/class.js");

//   expect(ret).toBe("/abc/__test__/class.spec.js");
// });

// test("测试代码内容生成工具", () => {
//   const src = new (require("../index"))();
//   const res = src.getTestFileSource("func", "class");

//   expect(res).toBe(`
// test('TEST func', () => {
//     const func = require('../class');
//     const ret = func()
//     expect(ret).toBe('test return')
// })
//     `);
// });

var fs = require("fs");
const path = require("path");

test("测试 生成测试代码文件", () => {
  // 准备环境
  // 删除测试文件夹

  const targetPath = path.resolve("./Abc");

  fs.rmdirSync(`${targetPath}/__test__`, {
    recursive: true,
  });

  const src = new (require("../index"))();

  src.genJestSource(targetPath);
});
