import {Router} from 'express'
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {body, validationResult} = require('express-validator') 

exports.signup = [
    body('username').trim().escape(),
    body('password').trim()
    .isLength(6).withMessage('Minimum length of 6'),
    body('confirm-password').custom((value,{req}) => {
        if(value != req.body.password) {
            throw new Error('confirmation password does not match')
        }
    }),
    async (req,res,next) => {
        const errors = validationResult(req)
        passport.authenticate('signup', {session:false}, (err, user, info) => {
            const errors = validationResult(req)
            if(!errors.isEmpty){
                return res.json({
                    username:req.body.username,
                    errors:errors.array()
                })
            }
            res.json({
                message:"Signed-up successfully",
                user:req.user
            })
        })(req,res,next)
    }
]

exports.login

exports.logout