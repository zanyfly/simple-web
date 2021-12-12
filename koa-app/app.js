const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose")
const db = require("./config/keys").mongURL
var bodyParser = require('koa-bodyparser');
const passport = require('koa-passport')

const app = new koa();
const router = new Router();
app.use(bodyParser())

router.get("/", async ctx=>{
    ctx.body = {
        msg: "hello world"
    }
})

const userRouter = require("./routes/api/users")
const profileRouter = require("./routes/api/profile")

//connect the mongdb
mongoose.connect(db, {useNewUrlParser: true})
.then(()=>{
    console.log("mongoose connect ok")
}).catch(err=>{
    console.log(`mongoose connect faile ${err}`)
})

app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)

//config router address  
//localhost:5000/api/users
router.use("/api/users", userRouter)
router.use("/api/profile", profileRouter)

//config router
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT  || 8888;
app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})