const fs = require("fs").promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path);
      if (data) {
        this.products = JSON.parse(data);
        return this.products;
      }
    } catch (error) {
      console.error("Error loading products!", error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      await this.loadProducts();
      const product = this.products.find((product) => product.id === productId);
      if (product) {
        return product;
      } else {
        console.log("Product not found!");
        return null;
      }
    } catch (error) {
      console.error("Error getting product by id!", error);
      throw error;
    }
  }
}

module.exports = ProductManager;
