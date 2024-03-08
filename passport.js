const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/userModel')
const passportJWT = require('passport-jwt')
const JWTstrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt


passport.use(new LocalStrategy(async(username, password,done) =>{
    const user = await User.findOne({username:username})
    if(!user){
        return done(null,false, {message:"Incorrect Username"})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return done(null,false, {message:"incorrect password"})
    }
    return done(null,user,{message:'Logged in!'})
}))

passport.use(
    new JWTstrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    }, 
    async (token, done) => {
        try{
            console.log(token)
            return done(null, token.user)
        }catch(err){
            return done(err)
        }
    })
)
 