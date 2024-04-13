const express = require("express");
const ProductManager = require("./product-manager.js");
const app = express();
const PORT = 8080;
const manager = new ProductManager("./src/products.json");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.get("/products", async (req, res) => {
  try {
    const products = await manager.loadProducts();
    let limit = parseInt(req.query.limit);
    if (limit) {
      const arrayLimit = products.splice(0, limit);
      return res.json(arrayLimit);
    } else {
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error loading products" });
  }
});

// Filtro por ID
app.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await manager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} OK`);
});
