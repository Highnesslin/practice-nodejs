# 运行

1. bash 运行
2. nodemon 运行
3. 通过 VS Code debug
4. jest

```javascript
npm install jest -g
```

```
jest index --watch
```

# jest 测试代码生成工具

- path.dirname 目录名
- path.basename 文件名
- path.extname 拓展名
- path.format 组装 root basename

# 测试代码生成

# 测试文件生成

- fs.rmdirSync 删除文件夹 recursive 删除文件夹中的文件
- fs.existSync 是否存在
- fs.mkdirSync 创建
- fs.readdirSync 读取文件列表
- fs.statSync 判断一个文件是否是文件或文件夹 .isFile 判断是否是文件
- fs.writeFileSync 写文件

# 异步

1. promise
2. 回调函数
3. generator

```javascript
const promise = (msg, timestamp = 3000) => new Promise(resolve => {
    setTimeout(() => {
        console.log(msg)
    }, timestamp)
})
const generator = function* (msg) => {
    yield promise(msg + 1)
    yield promise(msg + 2)
    yield promise(msg + 3)
}
const co = (generator) => {
  if ((it = generator.next().value)) {
    it.then((res) => {
      co(generator);
    });
  } else {
    return;
  }
};

co(generator("gagagaa"));
```

4. async/await **推荐**

- 1. 任何一个 `await` 语句后面的 `promise对象` 变成 `reject状态` ，那么整个 `async函数` 都会中断执行
- 2.

5. 事件监听方式处理

```javascript
const asyncFun = name => event => {
    setTimeout(() => {
        console.log(name)
        event.emit("end)
    }, 1000)
    return event
}
const {EventEmitter} = require("events")

```

ps：可以研究下 **EventEmitter** 的实现方式

发布订阅的一种实现

# http 缓存

- 强缓存

  - 1.1. **HTTP 1.0** 的 `Expires`
    `setHeader("Expires", 10 * 1000)`
    客户端和服务端时间可能出现时间快慢不一致
  - 1.2. **HTTP 1.1** 的 `cache-control`
    优先级高于 `Expires`
    balabala 好多规则，`Max-age=10*1000`

- 协商缓存
  - 1.1. last-modified
    ```javascript
    res.setHeader('last-modified', new Date().toUTCString());
    if (req.headers['if-modified-since'].getTime() + 3 * 1000 > Date.now()) {
      res.statusCode = 304;
      res.end();
    }
    ```
  - 1.2. Etag
    ```javascript
    // 根据内容创建的hash值
    if (req.headers['if-none-match'] === hash) {
      res.statusCode = 304;
      res.end();
    }
    ```

# 爬虫

request
iconv-lite 编码类型
cheerio 后端的 jquery

# SSO 单点登录

获取到登录状态后，将
