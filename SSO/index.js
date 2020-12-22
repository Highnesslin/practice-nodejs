const Koa = require('koa');
const bodyparser = require('koa-bodyparser')();
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa();

app.use(bodyparser);
app.use(static(__dirname + '/template'));

const cache = new Map();

// 授权登录
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  const id = Date.now();
  if (username === 'admin' && password === 'admin') {
    cache.set(id, { id, username, password });
  }

  ctx.body = JSON.stringify(cache.get(id));
});

app.use(router.routes());

app.listen(7001);

console.log('server start at *:7001');
