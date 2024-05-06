const express = require("express");
const productRoutes = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
