const Koa = require('koa');
const getPosts = require('./getPosts')
const getPost = require('./getPost')
const insertPost = require('./insertPost')
const updatePost = require('./updatePost')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')
const app = new Koa();
const router = new Router();

router.get('/posts', getPosts)
router.get('/post/:id', getPost)
router.post('/posts', insertPost)
router.put('/posts', updatePost)

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {
  ctx.body = "hello world"
})


app.listen(3002);