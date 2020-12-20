const Koa = require("koa");
const router = require("koa-router")();
const static = require("koa-static");
const app = new Koa();
const axios = require("axios");
const querystring = require("querystring");

app.use(static(__dirname + "/"));

router.get("/github/login", async (ctx) => {
  //
  ctx.body = `
  <h1>Hello,Sir</h1>`;
});

app.use(router.routes());
app.listen(7001);
