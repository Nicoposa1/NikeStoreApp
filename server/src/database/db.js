const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const database = client.db("test");
const products = database.collection("products");
const orders = database.collection("orders ");

module.exports = { products, client, orders };
