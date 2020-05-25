(async function() {

    const Koa = require('koa');
    const KoaRouter = require('koa-router');
    const KoaStatic = require('koa-static-cache');
    const KoaBodyparser = require('koa-bodyparser')
    const router = require('./routers');
    const core = require('koa-cors')
    const app = new Koa();

    app.use(core());

    app.use(KoaStatic('./public'), {
        prefix: 'public',
        gzip: true
    });

    app.use(KoaBodyparser())

    app.use(router.routes())

    app.listen(80)

})()