const Router = require("koa-router")
const User = require("../../models/user")
const tools = require('../../config/todo')
const gravatar = require('gravatar')
const router = new Router()
const jwt = require('jsonwebtoken');
const passport = require('koa-passport')
const validateRegisterInput = require("../../validation/register")

//localhost:5000/api/users/test
router.get("/test", async ctx => {
    ctx.status = 200
    ctx.body = { msg: "users test ok" }
})


router.post("/register", async ctx => {
    console.log(ctx.request.body)
    const { errors, isValid } =  validateRegisterInput(ctx.request.body)
    if(!isValid){
        ctx.status = 400
        ctx.body = errors
        return
    }
    //数据库 异步查询
    const findResult = await User.find({ email: ctx.request.body.email })
    console.log(findResult)
    if (findResult.length > 0) {
        ctx.status = 500
        ctx.body = { email: "email is existed" }
    } else {
        const avatar = gravatar.url(ctx.request.body.email, {s: 200, r: 'pg', d: 'mm'})
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: await tools.encryption(ctx.request.body.password),
            avatar: avatar
        })

        await newUser.save().then(user => {
            ctx.body = user
        }).catch(err => {
            console.log(err)
        })

        
        ctx.body = newUser
    }
})

//客户端必须要用www-form-urlencode的方式  这也是最常见的
router.post("/login", async ctx => {
    console.log(ctx.request.body)
    const findResult = await User.find({email: ctx.request.body.email})
    const user = findResult[0]
    if (findResult.length == 0){
        ctx.status = 404
        ctx.body = { email: 'user not existed'}
    }else{
        // console.log("findResult[0].password=" + user.password)
        var result = await tools.compareCrypt(ctx.request.body.password, user.password)
        if (result){
            //web token
            const payload = { id:user.id, name:user.name, avatar:user.avatar}
            const token = jwt.sign(payload, 'secret', {expiresIn:3600})
            ctx.status = 200
            ctx.body = { success:true, token:"Bearer "+token} 
        }else{
            ctx.status = 400
            ctx.body = { password: 'password wrong'}

        }
    }
})

router.get("/current", passport.authenticate('jwt', { session: false }), async ctx =>{
    // console.log("current")
    // console.log(ctx.request.header)
    ctx.body = {
        id: ctx.state.user.id,
        email: ctx.state.user.email,
        avatar: ctx.state.user.avatar,
        name: ctx.state.user.name
    }
})


module.exports = router.routes()