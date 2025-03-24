const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
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
    username: {
        type: String,
        required: true
    },
    numOfLikes: {
        type: Number,
        default: 0,
        required: true
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
    edited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)

