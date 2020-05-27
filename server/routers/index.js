const KoaRouter = require('koa-router');
const md5 = require('md5');
const Models = require('../models')



const router = new KoaRouter();


router.get('/api/comments', async ctx => {
  console.log(ctx.query)
     const page = ctx.query.page || 1;
    const prepage = Number(ctx.query.prepage) || 2 ;
    const offset = ((page -1) * prepage);
     
    const res  = await Models.contents.findAndCountAll({
        limit:prepage,
        offset,
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
          prepage,
          count:res.count,
          data,
          msg:''
      }
});

router.post('/api/register', async ctx => {
    console.log(ctx.request.body)
   const username = ctx.request.body.username;
   const password = ctx.request.body.password;
   const repassword = ctx.request.body.repassword;
   if(username == ''){
     return  ctx.body = {
           code:1,
           data:'',
           msg:'用户名不能为空'
       }
   }
   if(password == ''){
    return  ctx.body = {
          code:1,
          data:'',
          msg:'密码不能为空'
      }
  }
  if(password != repassword){
    return  ctx.body = {
          code:1,
          data:'',
          msg:'两次密码不一致'
      }
  }
  let user = await Models.users.findOne({
      where:{
        username
      }
   
  })
  if(user != null){
     return  ctx.body = {
          code:1,
          data:'',
          msg:'用户名已重复'
      }
  }
 let newPerson = await Models.users.build({
     username,
     password:md5(password)
 }).save()

 ctx.body = {
     code:0,
     data:{
         id:newPerson.get('id'),
         username:newPerson.get('username')
     },
     msg:'注册成功'
 }
})

router.post('/api/login', async ctx => {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password ;
    console.log(password)
    const getUser = await Models.users.findOne({
        where:{
            username
        }
    })
    if(getUser == null){
        return ctx.body ={
            code:1,
            data:'',
            msg:'没有该用户'
        }
    }

    if(username == ''){
        return ctx.body ={
            code:1,
            data:'',
            msg:'用户名不能为空'
        }
    }
    if(password == ''){
        return ctx.body ={
            code:1,
            data:'',
            msg:'密码不能为空'
        }
    }
    if(md5(password) != getUser.get('password')){
        return ctx.body = {
            code:2,
            data:'',
            msg:'用户名或密码不正确'
        }
    }else{
        ctx.body = {
            code:0,
            data:{
                username:getUser.get('username'),
                id: getUser.get('id')
            }
           
        }
      
    }
})
module.exports = router;