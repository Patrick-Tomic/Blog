const jwt = require('jsonwebtoken')
const passport = require('passport')
const {body, validationResult} = require("express-validator")
const User = require('../models/userModel')
const Post = require("../models/postModel")

exports.posts = async(req,res,next) => {
try{
    const allPosts = await Post.find({},'header message')
    .sort({header:1, message:1}).exec()
    res.status(200).json({posts:allPosts})
}catch(err) {
    res.status(403).json({err})
}
}

exports.createPost = [
    body('header','Please be descriptive').trim().isLength(10).escape(),
    body('message','Please be descriptive').trim().isLength(50).escape(),
    async(res,req,next) => {
        const errors = validationResult(req)
        const token = req.headers.authorization
        let decoded
        try{
            decoded.jwt.verify(token.split(' ')[1],process.env.SECRET)
        }catch(e) {
            return res.status(401).send('unauthorized')
        }
        const post = new Post({
            header:req.body.header,
            message:req.body.message,
            userId:decoded._id
        })
        post.save( err => {
            if(err){
                return next(err)
            }
        })
        res.status(200).json({message:'Post Created Successfully'})
    }
]

exports.getPost = async(req,res,next) => {
    const post = await Post.findOne({_id:req.body.id}, ' userId header message')
    .sort({header:1, message:1})
    .populate('userId').exec()
    const user = User.findOne({_id:post.userId},'username').exec()
    res.status(200).json({post:post, user:user})
}