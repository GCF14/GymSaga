const Post = require('../models/postModel')
const Comment = require('../models/commentModel');
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary')

async function getAllPosts(req, res) {
    try {
      const posts = await Post.find(); 
      res.status(200).json(posts); 
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  }

async function getPost(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid post ID'})
    }

    const post = await Post.findById(id).populate('comments')

    if(!post) {
        return res.status(404).json({error: 'No such post'})
    }

    res.status(200).json(post)
}

async function createNewPost(req, res) {
    const { text, username, numOfLikes, likedBy } = req.body;
    const files = req.files;
    const content = [];
  
    if (!text && (!files || files.length === 0)) {
      return res.status(400).json({ error: 'Please provide at least text, image, or video.' });
    }
  
    if (!username || numOfLikes === undefined || !likedBy) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
  
    try {
      if (text && text.trim() !== '') {
        content.push({ type: 'text', data: text });
      }
  
      if (files && files.length > 0) {
        for (const file of files) {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
          });
  
          content.push({
            type: result.resource_type,
            data: result.secure_url,
          });
        }
      }
  
      const post = await Post.create({
        content,
        username,
        numOfLikes,
        likedBy: JSON.parse(likedBy),
        comments: [],
      });
  
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
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