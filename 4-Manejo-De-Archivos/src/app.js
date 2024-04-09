const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      if (data) {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.error("Error loading products!", error);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Products saved successfully!");
    } catch (error) {
      console.error("Error saving products!", error);
    }
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.saveProducts();
    console.log("Product added to list!");
  }

  getProductById(productId) {
    this.loadProducts();
    const product = this.products.find((product) => product.id === productId);
    if (product) {
      return product;
    } else {
      console.log("Product not found!");
      return null;
    }
  }

  updateProduct(productId, updatedFields) {
    this.loadProducts();
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      console.log("Product updated successfully!");
    } else {
      console.log("Product not found!");
    }
  }

  deleteProduct(productId) {
    this.loadProducts();
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log("Product deleted successfully!");
    } else {
      console.log("Product not found!");
    }
  }
}

module.exports = ProductManager;

////////////////////////////////
// PRUEBA DEL CODIGO
////////////////////////////////

const pruebaProductManager = new ProductManager("productos.json");

// AGREGANDO PRODUCTOS
pruebaProductManager.addProduct({
  title: "producto 1",
  description: "descripcion A",
  price: 10,
  thumbnail: "imagen1.jpg",
  code: "C01",
  stock: 500,
});

pruebaProductManager.addProduct({
  title: "producto 2",
  description: "descripcion B",
  price: 20,
  thumbnail: "imagen2.jpg",
  code: "C02",
  stock: 200,
});

// OBTENER TODOS LOS PRODUCTOS
console.log(pruebaProductManager.getProducts());

// OBTENER PRODUCTO POR ID
// console.log(pruebaProductManager.getProductById(2));

// ACTUALIZAR PRECIO DE UN PRODUCTO
// pruebaProductManager.updateProduct(1, {price: 50});

// BORRAR UN PRODUCTO
// pruebaProductManager.deleteProduct(1);
