const express = require("express")
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')

router.post('/signup',userController.signup )

module.exports = router