const PostComment = require('../models/postCommentModel')
const mongoose = require('mongoose')

async function getAllComments(req, res) {
    const postComments = await PostComment.find({}).sort({createdAt: -1})
    res.status(200).json(postComments)
}

async function getComment(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id) || !postComment) {
        return res.status(404).json({error: 'No such post'})
    }
    const postComment = await PostComment.findById(id)
    res.status(200).json(postComment)
}

async function getAllCommentsFromPost(req, res) {
    const { parentPost } = req.params

    if (!parentPost) {
        return res.status(400).json({ message: 'Parent Post ID is required but is not found.' });
    }

    try {
        const comments = await PostComment.find({ parentPost: parentPost }).populate('parentPost');

        // Check if comments were found
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this post' });
        }

        res.status(200).json(comments); // Send back the comments
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
}