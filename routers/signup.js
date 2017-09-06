var router = require("koa-router")();
// GET '/signup' 注册页
router.get("/signup", async (ctx, next) => {
  await ctx.render("signup", {});
});
module.exports = router;
