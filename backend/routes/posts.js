const express = require('express')
const router = express.Router()
const {
    createNewPost, 
    getAllPosts,
    getPost,
    deletePost,
    updatePost
} = require('../controllers/postController')
// const requireAuth = require('../middleware/requireAuth')

// router.use(requireAuth)

router.get('/', getAllPosts)

router.get('/:id', getPost)

router.post('/', createNewPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)

module.exports = router
