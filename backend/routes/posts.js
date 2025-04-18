const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const {
    createNewPost, 
    getAllPosts,
    getPost,
    deletePost,
    updatePost
} = require('../controllers/postController')


router.get('/', getAllPosts)

router.get('/:id', getPost)

router.post('/', upload.array('files'), createNewPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)


module.exports = router
