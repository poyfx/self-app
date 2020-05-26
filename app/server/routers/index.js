const KoaRouter = require('koa-router');

const Models = require('../models')



const router = new KoaRouter();


router.get('/api/comments', async ctx => {
  
  

     
    const res  = await Models.contents.findAndCountAll({
        limit:3,
        offset:0,
        include:{
            model:Models.users
        }
    });
   
    const data = res.rows.map(el=>{
        return {
            id:el.id,
            title:el.title,
            content:el.content,
            user_id:el.user_id,
            username:el.user.username,
            updatetime:el.updatetime,
            like_count:el.like_count,
            comment_count:el.comment_count,
            create_time:el.createdAt
            
        }
    })

      ctx.body =   {
          code:0,
          count:res.count,
          data,
          msg:''
      }
});


module.exports = router;