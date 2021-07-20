const connect = require("../config/dataBase");
const ObjectID = require("mongodb").ObjectID;

exports.getPosts = async () => {
  const db = await connect();
  const allPosts = await db.collection("memories").find({}).toArray();
  return allPosts;
};

exports.createPost = async (newPost) => {
  const db = await connect();
  await db.collection("memories").insertOne(newPost);
};

exports.updatePost = async (id, update) => {
  const db = await connect();
  const result = await db
    .collection("memories")
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: update });
  return result;
};

exports.deletePost = async (id) => {
  const db = await connect();
  const result = await db
    .collection("memories")
    .findOneAndDelete({ _id: ObjectID(id) });
  return result;
};