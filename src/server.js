const Koa = require('koa');
const getPosts = require('./getPosts')
const insertPost = require('./insertPost')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const app = new Koa();
const router = new Router();

router.get('/posts', getPosts)
router.get('/post/:id', getPosts)
router.post('/posts', insertPost)

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
  ctx.body = "hello world"
})


app.listen(3000);