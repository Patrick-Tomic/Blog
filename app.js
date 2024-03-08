
require('dotenv').config()
const config = require('./passport.js')
const express = require("express")
const app = express()
const bcrypt = require('bcryptjs')

const mongoose = require("mongoose")
const passport =require('passport') 
const cors = require('cors')
const apiRouter = require("./routes/api")
   
app.use(cors()) 
mongoose.set("strictQuery",false)
const mongoDB = process.env.SESSION_SERVER
mongoose.connect(mongoDB)
const db = mongoose.connection
db.on("error", console.error.bind(console, 'mongo connection error'))

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
 
 
app.use('/api',apiRouter)
   
 
app.listen(3001, () => console.log('Listening on port 3001'))

 