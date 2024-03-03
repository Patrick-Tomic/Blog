const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const passportJWT = require('passport-jwt')
const JWTstrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


passport.use("local", new localStrategy(async(username, password, done) => {
    const user = await User.findOne({username:username})
    if(!user){
       return done(null, false, {message:"Incorrect Username"}) 
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return done(null, false, {message:"Incorrect Password"})
    }
    return done(null, user, {message:"Logged in!"})
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
 