const path = require("path");
module.exports = class TestNow {
  /**
   * 生成测试代码块
   * @param {*} methodName
   * @param {*} clasFile
   * @param {*} isClass
   */
  getTestFileSource(methodName, classFile, isClass = false) {
    return `
test('TEST ${methodName}', () => {
    const ${
      isClass ? "{}" + methodName + "}" : methodName
    } = require('../${classFile}');
    const ret = ${methodName}()
    expect(ret).toBe('test return')
})
    `;
  }
  /**
   * 生成测试文件名
   * @param {*} fileName 代码文件名
   */
  getTestFileName(fileName) {
    const dirname = path.dirname(fileName);
    const baseName = path.basename(fileName);
    const extName = path.extname(fileName);

    const testFileName = baseName.replace(extName, `.spec${extName}`);

    return path.format({
      root: dirname + "/__test__/",
      base: testFileName,
    });
  }
};
