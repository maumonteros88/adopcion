const connect = require('../config/dataBase');
const ObjectID = require('mongodb').ObjectID;

exports.getPosts = async () => {
  const db = await connect();
  const allPosts = await db.collection('memories').find({}).toArray();
  return allPosts;
};

exports.createPost = async(newPost)=>{

  const db = await connect();
  await db.collection('memories').insertOne(newPost);
  
}