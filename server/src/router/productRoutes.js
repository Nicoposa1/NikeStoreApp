const express = require("express");
const router = express.Router();
const { getAllProducts, getOneProduct } = require("./database/products");
router.get("/", async (req, res) => {
  const products = await getAllProducts();
  console.log("🚀 ~ router.get ~ products:", products);
  res.send({ status: "OK", data: products });
});

router.get("/:productId", (req, res) => {
  res.send(`Get product with id ${req.params.productId}`);
});

module.exports = router;
