const express = require("express");
const router = express.Router();
const { getAllProducts, getOneProduct } = require("../database/products");
router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send({ status: "OK", data: products });
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await getOneProduct(req.params.productId);
    if (!product) {
      res.status(404).send({ status: "error", message: "Product not found" });
      return;
    }
    res.send({ status: "OK", data: product });
  } catch (error) {
    res.send({ status: "error", message: error.message });
  }
});

module.exports = router;
