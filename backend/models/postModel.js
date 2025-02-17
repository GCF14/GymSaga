const mongoose = require('mongoose')
const Schema = mongoose.Schema


const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },

    // username + timestamp would be the primary ID
    username: {
        type: String,
        required: true
    },
    numOfLikes: {
        type: Number,
        required: true
    },
    // usernames of the accounts that liked the post. 
    likedBy: {
        type: Array, 
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)

