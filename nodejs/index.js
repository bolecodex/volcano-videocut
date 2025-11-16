const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();
const config = require('./config/default')
const demoController = require('./controllers/demo')

const app = new Koa()
const router = new Router()

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  const headers = ctx.request.headers;
  const customHeaders = {};
  for (const key in headers) {
    if (key.startsWith('x-') || key.startsWith('X-')) {
      customHeaders[key] = headers[key];
    }
  }
  ctx.state.customHeaders = customHeaders;
  await next();
});

router.post('/api/createProject', demoController.createProject)
router.post('/api/describeProject', demoController.describeProject)
router.post('/api/searchEditMaterial', demoController.searchEditMaterial)
router.post('/api/updateProject', demoController.updateProject)
router.post('/api/deleteEditMaterial', demoController.deleteEditMaterial)
router.post('/api/createEditMaterial', demoController.createEditMaterial)
router.post('/api/getEffectList', demoController.getEffectList)
router.post('/api/submitEditTaskAsync', demoController.submitEditTaskAsync)
router.post('/api/updateMediaPublishStatus', demoController.updateMediaPublishStatus)
router.get('/api/searchVideo', demoController.searchVideo)
router.get('/api/getVideoPlayInfo', demoController.getVideoPlayInfo)
router.get('/api/mGetMaterial', demoController.mGetMaterial)
router.get('/api/getUploadToken', demoController.getUploadToken)
router.get('/api/getConfig', demoController.getConfig)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
