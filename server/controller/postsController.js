const postModel = require("../model/postModel");

exports.getPosts = async (req, res) => {
  try {
    postModel.getPosts().then((results) => {
      res.status(200).json({ message: "ok", results });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPost = {
    title,
    message,
    selectedFile,
    creator,
    tags:[tags],
    likeCount: 0,
    createAt: new Date(),
  };
  postModel
    .createPost(newPost)
    .then(() => {
      res.send({ message: "Datos guardados" });
    })
    .catch((error) => res.send({ message: "error", error }));
};
