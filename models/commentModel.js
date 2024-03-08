const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentModel = new Schema({
    message:{type:String, required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    postId : {type:Schema.Types.ObjectId, ref:"Post", required:true},
    timeStamp:Date
})