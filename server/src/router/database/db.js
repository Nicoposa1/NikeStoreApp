const { MongoClient } = require("mongodb");
// import .env file to use environment variables
require("dotenv").config();

// Connection URI
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const database = client.db("test");
const products = database.collection("products");

module.exports = { products, client };
