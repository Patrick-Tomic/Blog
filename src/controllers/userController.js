
const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const {body, validationResult} = require('express-validator') 
const User = require('../models/userModel')
exports.signup = [
    body('username').trim().escape(),
    body('password').trim() 
    .isLength(6).withMessage('Minimum length of 6').escape(),
     body('confirmPassword').custom(async(value,{req}) => {
        if(value != req.body.password) {
            throw new Error(`${req.body.password} does not match ${value}`)
        }
    }).escape(),  
    async (req,res,next) => {
        const errors = validationResult(req)
        const attempt = await User.findOne({username:req.body.username})
        if(attempt != undefined || !errors.isEmpty()){
            return res.status(403).json({
                username:req.body.username,
                errors:errors.array(),
                message:`username taken`
            })
        } 
         
        const hash =await  bcrypt.hash(req.body.password, 13)
     
        const user = new User({
            username:req.body.username,
            password:hash,
            admin:false
        })
        user.save() 
        return res.status(200).json({
            message:'User created successfully'
        })
        
    }
]

exports.login = async(req,res,next) =>{
try{ 
    passport.authenticate('local', {session:false}, (err,user,info) =>{
        if(err || !user){
            const error = new Error("User does not exist")
            return res.status(403).json({
                info
            })
        }
        req.login(user, {session:false}, (err) => {
            if(err) {
                next(err)
            }
            //Create token
            const body = {_id:user._id, username:user.username, admin:user.admin}
            const token = jwt.sign({user:body}, process.env.SECRET, {expiresIn:'1d'})
            return res.status(200).json({body, toke_n})

        })
    })(req,res,next)
}catch(err){ 
    res.status(403).json({
        err
    })
}
}

exports.logout = (req,res,next) => {
    console.log('logged out')
}

exports.user = async(req,res,next) => {
    const user = await User.findOne({username:'lightwicked'}).exec()
    if(!user){
        res.status(403).json({message:'no'})
    } else{
        res.status(200).json(user)
    }
}
  