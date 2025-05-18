const Post = require('../models/postModel')
const Comment = require('../models/commentModel');
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary')
const User = require('../models/userModel')

async function getAllPosts(req, res) {
  try {
    // Find all posts
    const posts = await Post.find();
    
    // Get all unique usernames from posts
    const usernames = [...new Set(posts.map(post => post.username))];
    
    // Fetch user details for all relevant usernames in one query
    const users = await User.find({ username: { $in: usernames } });
    
    // Create a username to user details map for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user.username] = {
        profilePicture: user.profilePicture,
        bio: user.bio
      };
    });
    
    // Enrich post data with user details
    const enrichedPosts = posts.map(post => {
      const postObject = post.toObject();
      const userDetails = userMap[post.username] || {};
      
      return {
        ...postObject,
        profilePicture: userDetails.profilePicture || '',
        bio: userDetails.bio || '',
        date: post.createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
    });
    
    res.status(200).json(enrichedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
}

async function getPost(req, res) {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid post ID'})
    }

    try {
        const post = await Post.findById(id).populate('comments')

        if(!post) {
            return res.status(404).json({error: 'No such post'})
        }


        const user = await User.findOne({ username: post.username });
        
        const enrichedPost = post.toObject();
        if (user) {
            enrichedPost.profilePicture = user.profilePicture;
            enrichedPost.bio = user.bio;
        }

        res.status(200).json(enrichedPost)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
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
      

      const user = await User.findOne({ username });
      const enrichedPost = post.toObject();
      
      if (user) {
        enrichedPost.profilePicture = user.profilePicture;
        enrichedPost.bio = user.bio;
      }
  
      res.status(200).json(enrichedPost);
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

const getPostsByUsername = async (req, res) => {

    const { username } = req.params;

    try {
        const user = await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
};


module.exports = {
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    createNewPost,
    getPostsByUsername
}