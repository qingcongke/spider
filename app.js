const Koa = require("koa");
const router = require("koa-router");
const app = new Koa();
const KoaBodyParser = require("koa-bodyparser");

const index = router.get("/", ctx => {
  ctx.response.body = "Hello";
});
