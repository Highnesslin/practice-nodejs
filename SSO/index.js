const Koa = require('koa');
const bodyparser = require('koa-bodyparser')();
const router = require('koa-router')();
const static = require('koa-static');
const { getUserInfoById, saveUserInfo } = require('./services/UserServices');
const { delay } = require('./utils');

const app = new Koa();

app.keys = ['im a newer secret', 'i like cat'];

app.use(bodyparser);
app.use(static(__dirname + '/'));

// 授权登录
router.post('/login', async ctx => {
  let userId = ctx.cookies.get('USER_ID');

  if (!userId) {
    await delay(2000);
    userId = Date.now().toString();

    const { username, password } = ctx.request.body;

    if (username === 'admin' && password === 'admin') {
      saveUserInfo({ userId, username, password });
      ctx.cookies.set('USER_ID', userId, { signed: true, maxAge: 7200000 });
    }
  }
  ctx.body = getUserInfoById(userId);
});

// 用户信息
router.get('/', async ctx => {
  const userId = ctx.cookies.get('USER_ID');

  const userInfo = getUserInfoById(userId);

  if (userInfo) {
    ctx.body = `
        <h1>${userInfo.userId}</h1>
        <h1>${userInfo.username}</h1>
      `;
  } else {
    ctx.redirect('/template');
  }
});

app.use(router.routes());

app.listen(7001);

console.log('server start at *:7001');
