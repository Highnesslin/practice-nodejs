// test("测试文件名生成", () => {
//   const src = new (require("../index"))();
//   const ret = src.getTestFileName("/abc/class.js");

//   expect(ret).toBe("/abc/__test__/class.spec.js");
// });

test("测试代码内容生成工具", () => {
  const src = new (require("../index"))();
  const res = src.getTestFileSource("func", "class");

  expect(res).toBe(`
test('TEST func', () => {
    const func = require('../class');
    const ret = func()
    expect(ret).toBe('test return')
})
    `);
});
