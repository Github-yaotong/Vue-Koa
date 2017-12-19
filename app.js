const Koa = require('Koa')
const json = require('Koa-json')
const logger = require('Koa-logger')
const koaBodyparser = require('koa-bodyparser')
const auth = require('./server/routes/auth.js')
const api = require('./server/routes/api.js')
const jwt = require('koa-jwt')
const koaRouter = require('koa-router')
const historyApiFallback = require('koa2-history-api-fallback');

const path = require('path')
const serve = require('koa-static')

const app = new Koa();
const router = koaRouter();

app.use(koaBodyparser());
app.use(json());
app.use(logger());


app.use(async function(ctx, next){
    let start = new Date();
    await next();
    let ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
});

// app.use(async funtcion(ctx, next){
//     try{
//         await next()
//     } catch(err) {
//         if (err.status == 401){
//             crx.status = 401;
//             ctx.body = {
//                 success: false,
//                 token: null,
//                 info: 'Protected resource, use Authorization header to get access'
//             }
//         } else {
//             throw err;
//         }
//     }
// })

app.on('error', function(err, ctx){
    console.log('[server error]: error', err);
});

router.use('/auth', auth.routes());
router.use('/api', jwt({secret: 'vue-koa-demo'}), api.routes());

app.use(router.routes());
app.use(historyApiFallback())// 在这个地方加入。一定要加在静态文件的serve之前，否则会失效。
app.use(serve(path.resolve('dist')));

app.listen(8889, () =>{
    console.log('Koa is listening in 8889...');
});

module.exports = app;