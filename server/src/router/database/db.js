const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const database = client.db("test");
const products = database.collection("products");

module.exports = { products, client };
