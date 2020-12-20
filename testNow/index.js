const path = require("path");
const fs = require("fs");

module.exports = class TestNow {
  genJestSource(sourcePath = path.resolve("./")) {
    const testPath = `${sourcePath}/__test__`;
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath);
    // 添加完整路径
    list
      .map((v) => `${sourcePath}/${v}`)
      // 过滤文件
      .filter((v) => fs.statSync(v).isFile())
      // 排除测试代码
      .filter((v) => !v.includes(".spec"))
      // 执行
      .map((v) => this.genTestFile(v));
  }

  genTestFile(filename) {
    const testFileName = this.getTestFileName(filename);

    // 是否存在
    if (fs.existsSync(testFileName)) {
      console.log(`${testFilename}已存在`);
      return;
    }
    const mod = require(filename);
    let source;
    console.log("typeof mod", typeof mod, filename);
    if (typeof mod === "object") {
      source = Object.keys(mod)
        .map((v) => this.getTestFileSource(v, path.resolve(filename), true))
        .join("\n");
    } else if (typeof mod === "function") {
      source = this.getTestFileSource(
        path.basename(filename).replace(".js", ""),
        path.resolve(filename),
        false
      );
    }
    fs.writeFileSync(testFileName, source);
  }

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
      isClass ? "{" + methodName + "}" : methodName
    } = require('${classFile}');
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
