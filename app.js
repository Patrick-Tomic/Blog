const express = require("express")
const app = express()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const mongoose = require("mongoose")
const User = require("./src/models/userModel")
const passport = require('passport')
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use("login", new localStrategy(async(username, password, done) => {
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
 
passport.use('signup', new localStrategy(async(username, password, done)=>{
    const user = User.findOne({username:username})
    if(user){
        done(null,false,{message:"Username taken"})
    }
    const newUser = User.create({username, password})
    return done(null,newUser)

}))

mongoose.set("strictQuery",true)
const mongoDB = process.env.SESSION_SERVER
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on("error", console.error.bind(console, 'mongo connection error'))

 