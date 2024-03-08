const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const passportJWT = require('passport-jwt')
const JWTstrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username:username}, (err, user) => {
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, {message:"Incorrect Username"}) 
         }
         bcrypt.compare(password, user.password, (err,res) => {
            if(res) {
                return done(null, user)
            } else{
                return done(null,false,{message:"Incorrect Password"})
            }
         })
    })
   
}))

passport.use(
    new JWTstrategy( 
        {
            secretOrKey:process.env.SECRET,
            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        async(token, done) => {
            try{
                return done(null, token.user)
            }catch(err){
                done(err)
            }
        }
    )
)
 