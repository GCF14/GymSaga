const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    numOfLikes: {
        type: Number,
        default: 0,
        required: false
    },
    // usernames of the accounts that liked the post. 
    likedBy: {
        type: Array,
        default: [], 
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)

