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

async function postCreate(message, header,id ){
    const post = new Post({header:header, message:message, userId:id})
    await post.save()
    posts.push(post)
    console.log(`new post from ${id}`)
}


async function createPosts() {
    console.log('adding posts')
    const user = await User.findOne({username:'lightwicked'}).exec()
    await Promise.all([
        postCreate('Test number 1','Hope this works', user._id),
        postCreate('It was the best of times and the worst of times','tale of two cities', user._id),
        postCreate('to be or not to be that is the question','hamlet', user._id)
    ])
}