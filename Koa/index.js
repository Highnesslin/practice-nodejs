const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa();
const querystring = require('querystring');
const { reqGithubUser, reqGithubToken } = require('./api');

app.use(static(__dirname + '/template'));

const config = {
  client_id: '924b0f275b200b1aed50',
  client_secret: '44f1d332e370b0aa6ea897883bd00947fceefed7',
};

// github 授权登录
router.get('/github/login', async ctx => {
  //
  let path = `https://github.com/login/oauth/authorize`;
  path += `?client_id=${config.client_id}`; // &client_secret=${config.client_secret}
  ctx.redirect(path);
});

// github 授权回调
router.get('/auth/github/callback', async ctx => {
  const { code } = ctx.query;

  const ret = await reqGithubToken(code);

  const data = querystring.parse(ret.data);

  const { data: user } = await reqGithubUser(data.access_token);

  ctx.body = `
    <h1>github:${user.login}</h1>
    <h1>name:${user.name}</h1>
    <img src="${user.avatar_url}"/>
    <a href="${user.html_url}">主页</a>
    <h1>${user.company} - ${user.location}</h1>
  `;
});

app.use(router.routes());

app.listen(7001);

console.log('server start at *:7001');
