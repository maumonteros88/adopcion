require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const URL = process.env.DB_MONGO_URL 
const connect = async () => {
  try {
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const db = client.db('react-node');
    return db;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;