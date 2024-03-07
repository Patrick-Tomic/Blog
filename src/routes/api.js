const express = require("express")
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

router.post('/signup',userController.signup )

router.post('/login',userController.login)

router.post('/logout', userController.logout)
module.exports = router

router.get('/user',userController.user)  

router.get('/posts',postController.posts) 