const express = require("express");
const router = express.Router();

const posts = require("./posts/postsRoutes");



router.use("/posts", posts);

module.exports = router;
