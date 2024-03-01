const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    header:{type:String, require:true},
    message:{type:String,require:true},
    userId: {type:Schema.Types.ObjectId, ref:'User', required:true},
    timestamp: Date
})

module.exports = mongoose.model('Post', postSchema)