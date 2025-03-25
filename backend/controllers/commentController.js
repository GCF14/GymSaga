const Comment = require('../models/commentModel');
const mongoose = require('mongoose')
const Post = require('../models/postModel')

async function addComment(req, res) {
    const { postId, username, text } = req.body

    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' })
    }

    try {
        const comment = await Comment.create({ postId, username, text })
        await Post.findByIdAndUpdate(postId, {$push: { comments: comment._id } })
        res.status(200).json(comment)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function editComment(req, res) {
    const { postId } = req.params;
    const { text } = req.body;

    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' })
    }

    const comment = await Comment.findByIdAndUpdate(id, { text }, { new: true })

    if(!comment) {
        return res.status(404).json({ error: 'No such comment' })
    }

    res.status(200).json(comment)
}

async function deleteComment(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid comment ID' })
    }

    const comment = await Comment.findByIdAndDelete(id)

    if(!comment) {
        return res.status(404).json({ error: 'No such comment' })
    }

    await Post.updateOne({ comments: id }, { $pull: { comments: id } });

    res.status(200).json(comment)
}

module.exports = {
    addComment,
    editComment,
    deleteComment
}