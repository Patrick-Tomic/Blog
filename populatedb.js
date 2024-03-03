const userArgs = process.argv.slice(2)
const bcrypt = require('bcryptjs')
const User = require('./src/models/userModel')
const Post = require('./src/models/postModel')
const Comment = require('./src/models/commentModel')
require('dotenv').config()
const users = []
const comments = []
const posts = []

const Mongoose = require("mongoose")
Mongoose.set('strictQuery',false)
const mongoDB = userArgs[0]
main().catch((err) => console.log(err))

async function main(){
    console.log('Debug: About to connect')
    await Mongoose.connect(process.env.SESSION_SERVER)
    console.log("Debug:Should be connected?")
    await createUsers()
    await createPosts()
  
    console.log('Debug:closing mongoose')
    Mongoose.connection.close()
}

async function userCreate(username, password){
 
    const user = new User({username:username, password:password, admin:false})
    await user.save() 
    users.push(user)
    console.log(`Added User: ${username}`)
}

async function postCreate(message, header  ){
    const id = User.find({username:'lightwicked'}, '_id username').exec()
    const post = new Post({header:header, message:message, userId:id._id})
    await post.save()
    posts.push(post)
    console.log(`new post from ${id.username}`)
}

async function createUsers() {
    console.log('adding users')
    await Promise.all([userCreate('lightwicked','CoNereNDFReP1')])
}
async function createPosts() {
    console.log('adding posts')
    await Promise.all([
        postCreate('Test number 1','Hope this works'),
        postCreate('It was the best of times and the worst of times','tale of two cities'),
        postCreate('to be or not to be that is the question','hamlet')
    ])
}