const express = require('express');
const router = express.Router();

const posts = require('../../controller/postsController');

router.get('/', posts.getPosts);
router.post('/newPost', posts.createPost);

module.exports = router;