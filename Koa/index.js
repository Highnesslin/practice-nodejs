const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa();
const axios = require('axios');
const querystring = require('querystring');

app.use(static(__dirname + '/'));

const config = {
  client_id: '924b0f275b200b1aed50',
  client_secret: '44f1d332e370b0aa6ea897883bd00947fceefed7',
};

router.get('/github/login', async ctx => {
  //
  let path = `https://github.com/login/oauth/authorize`;
  path += `?client_id=${config.client_id}`; // &client_secret=${config.client_secret}
  ctx.redirect(path);
});

router.get('/auth/github/callback', async ctx => {
  const { code } = ctx.query;

  const params = {
    ...config,
    code,
  };

  const ret = await axios.post('https://github.com/login/oauth/access_token', params);

  const data = querystring.parse(ret.data);

  console.log('data.access_token', data.access_token);

  const { data: user } = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${data.access_token}`,
    },
  });

  console.log('user', user);

  ctx.body = `
    <h1>${user.login}</h1>
    <img src="${user.avatar_url}"/>
    <a href="${user.html_url}">主页</a>
    <h1>${user.company} - ${user.location}</h1>
  `;
});

app.use(router.routes());

app.listen(7001);

console.log('server start at *:7001');
