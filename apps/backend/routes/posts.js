const express = require('express');

const router = express.Router();
const {
  createNewPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  getPostsByUsername,
  likePost,
} = require('../controllers/postController');
const upload = require('../middleware/multer');

router.get('/', getAllPosts);

router.get('/:id', getPost);

router.post('/', upload.array('files'), createNewPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

router.get('/user/:username', getPostsByUsername);

router.patch('/:id/like', likePost);

module.exports = router;
