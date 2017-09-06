const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const ejs = require("ejs");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const config = require("./config/default.js");
const router = require("koa-router");
const views = require("koa-views");
const koaStatic = require("koa-static");
const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
};

//配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig)
  })
);

app.use(koaStatic(path.join(__dirname, "./public")));

app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs"
  })
);

app.use(bodyParser());

app.use(require("./routers/signup.js").routes());

app.listen(3000);

console.log(`listening on port ${config.port}`);
