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
  const { name, rasgos, selectedFile, creator, type } = req.body;

  const newPost = {
    name,
    rasgos,
    selectedFile,
    creator,
    type,
    createAt: new Date(),
  };
  postModel
    .createPost(newPost)
    .then(() => {
      res.send({ message: "Datos guardados" });
    })
    .catch((error) => res.send({ message: "error", error }));
};

exports.updatePost = (req, res) => {
  const { id: _id } = req.params;
  const update = {
    rasgos: req.body.rasgos,
    selectedFile: req.body.selectedFile,
    creator: req.body.creator,
    type: req.body.type,
    name: req.body.name,
    createAt: new Date(),
  };

  postModel
    .updatePost(_id, update)
    .then((result) => {
      res.status(200).json({ message: "actualizado", result });
    })
    .catch((error) => res.status(404).json({ message: error }));
};

exports.deletePost = (req, res) => {
  const { id: _id } = req.params;
  postModel
    .deletePost(_id)
    .then((result) => {
      res.status(200).json({ message: "Borrado", result });
    })
    .catch((error) => res.status(404).json({ message: error }));
};
