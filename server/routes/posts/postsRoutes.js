const express = require('express');
const router = express.Router();

const posts = require('../../controller/postsController');

router.get('/', posts.getPosts);
router.post('/newPost', posts.createPost);
router.patch('/updatePost/:id', posts.updatePost)
router.delete('/deletePost/:id', posts.deletePost)

module.exports = router;