const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
const mongoose = require("mongoose")
const User = mongoose.model('users')
module.exports = passport =>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("jwt_payload=")
         console.log(jwt_payload)
        // const user = User.findById(jwt_payload.id) 
        // if(user){
        //     return done(null, user)
        // }else{
        //     return done(null, false)
        // }
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}