const Router = require("koa-router")
const tools = require('../../config/todo')
const router = new Router()
const passport = require("koa-passport")
const Profile = require("../../models/profile")
const validateProfileInput = require("../../validation/profile")

//GET api/profile/test
router.get("/test", async ctx => {
    ctx.status = 200
    ctx.body = { msg: "profile test ok" }
})

router.get("/", passport.authenticate('jwt', {session: false}),  async ctx=>{
    // console.log(ctx.state.user)
    //链表查询
    const profile = await Profile.find({ user: ctx.state.user.id}).populate('user', 
        ["name", "avatar"])
    if(profile.length > 0){
        ctx.status = 200
        ctx.body = profile
    }else{
        ctx.status = 404
        ctx.body = {noprofile: "no user info"}
    }
})

//添加
router.post("/", passport.authenticate('jwt', {session: false}),  async ctx=>{

    const { errors, isValid } =  validateProfileInput(ctx.request.body)
    if(!isValid){
        ctx.status = 400
        ctx.body = errors
        return
    }

    const profileFields = {}
    profileFields.user = ctx.state.user.id
        if(ctx.request.body.handle){
            profileFields.handle = ctx.request.body.handle
        }
        if(ctx.request.body.company){
            profileFields.company = ctx.request.body.company
        }
        if(ctx.request.body.website){
            profileFields.website = ctx.request.body.website
        }
        if(ctx.request.body.location){
            profileFields.location = ctx.request.body.location
        }
        if(ctx.request.body.status){
            profileFields.status = ctx.request.body.status
        }
        
        //skills 数组
        if(typeof ctx.request.body.skills != undefined){
            profileFields.skills = ctx.request.body.skills.split(',')
        }
        profileFields.social = {}
        if(ctx.request.body.wechat){
            profileFields.social.wechat = ctx.request.body.wechat
        }
        if(ctx.request.body.qq){
            profileFields.social.qq = ctx.request.body.qq
        }
        if(ctx.request.body.tencentkit){
            profileFields.social.tencentkit = ctx.request.body.tencentkit
        }

        //查询数据库
        const profile = await  Profile.find({ user: ctx.state.user.id})
        if (profile.length > 0){
            const profileUpdate = await Profile.findOneAndUpdate(
                {user: ctx.state.user.id},
                { $set: profileFields},
                { new: true}
                )        
            ctx.body = profileUpdate
        }else{
            await new Profile(profileFields).save().then(profile=>{
                ctx.status = 200
                ctx.body = profileFields
            })
        }
    
})

module.exports = router.routes()