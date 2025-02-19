const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postCommentSchema = new Schema({
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
    },
    parentPost: {
        // refers to the Post object.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }

}, { timestamps: true })


module.exports = mongoose.model('postComment', postCommentSchema)


// utils
function getParentPost(comment) {
    return comment.parentPost
}