const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    content: [{
        type: {
            type: String,
            enum: ['text', 'image', 'video'],
            required: true

        },
        data: {
            type: String,
            required: function() {
                return this.type !== 'text'
            }
        },
        file: {
            data: Buffer,
            contentType: String
        }
    }],
    dateOfCreation: {
        type: Date,
        required: true
    },
    numOfLikes: {
        type: Number,
        default: 0,
        required: true
    },
    likedBy:[{ 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema)