const jwt = require('jsonwebtoken')
const passport = require('passport')
const {body, validationResult} = require("express-validator")
const User = require('../models/userModel')
const Post = require("../models/postModel")

exports.posts = async(req,res,next) => {
try{
    const allPosts = Post.find({},'header message')
    .sort({header:1, message:1}).exec()
    res.status(200).json({posts:allPosts})
}catch(err) {
    res.status(403).json({err})
}
}

exports.createPost = async(req,res,next) => {
    
}