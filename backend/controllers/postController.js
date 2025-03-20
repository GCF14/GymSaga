const Post = require('../models/postModel')
const mongoose = require('mongoose')

async function getAllPosts(req, res) {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
}

async function getPost(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id) || !post) {
        return res.status(404).json({error: 'No such post'})
    }
    const post = await Post.findById(id)
    res.status(200).json(post)
}

async function createNewPost(req, res) {
    const {content, username, dateOfCreation, numOfLikes, likedBy} = req.body
    if(!content) {
        emptyFields.push('content')
    }
    if(!username) {
        emptyFields.push('username')
    }
    if (!numOfLikes) {
        emptyFields.push('numOfLikes')
    }
    if (!dateOfCreation) {
        emptyFields.push('dateOfCreation')
    }
    if (!likedBy) {
        emptyFields.push('likedBy')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const post = await Posts.create({ content, username, dateOfCreation, numOfLikes, likedBy })
        res.status(200).json(post)
    } 
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

async function deletePost(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'No such post'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if(!post) {
        return res.status(400).json({error:'No such post'})
    }

    res.status(200).json(post)    
}

async function updatePost(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'No such post'})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!post) {
        return res.status(400).json({error:'No such post'})
    }

    res.status(200).json(post)
}

module.exports = {
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    createNewPost
}