const express = require("express")
const app = express()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const mongoose = require("mongoose")
const passport =require('passport') 

const apiRouter = require("./src/routes/api")

 
mongoose.set("strictQuery",false)
const mongoDB = process.env.SESSION_SERVER
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on("error", console.error.bind(console, 'mongo connection error'))

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
 
 
app.use('/api', apiRouter)
   

app.listen(3000, () => console.log('Listening on port 3000'))

 