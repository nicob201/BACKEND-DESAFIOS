import productModel from "../dao/models/product.model.js";

// Devuelve todos los productos de la base de datos
async function getProducts(req, res) {
  try {
    const { sort, limit = 10, page = 1, category } = req.query;
    const query = category ? { category } : {};

    let options = {
      limit: parseInt(limit, 10),
      page: parseInt(page, 10)
    };

    if (sort === "asc" || sort === "desc") {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await productModel.paginate(query, options);

    // Filtro por categoría
    const categories = await productModel.distinct("category");

    const baseUrl = `/products?limit=${limit}&sort=${sort || ""}&category=${category || ""}`;

    // Estructura de la respuesta del server
    const response = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `${baseUrl}&page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `${baseUrl}&page=${result.nextPage}` : null,
      categories: categories
    };
    res.json(response);
  } catch (error) {
    console.log("Error fetching products!", error);
    res.status(500).send({ status: "error", error: "Failed to fetch products!" });
  }
}

// Devuelve un producto por su ID
async function getProductById(req, res) {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ status: "error", error: "Product not found!" });
    }
    res.send(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).send({ status: "error", error: "Failed to get product!" });
  }
}

// Crea un nuevo producto
async function createProduct(req, res) {
  let { title, description, price, thumbnail, code, status, stock } = req.body;

  if (!title || !price || !stock) {
    return res.status(400).send({status: "error",error: "It is required to input the title, price, and stock",});
  }

  try {
    let result = await productModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      status: status !== undefined ? status : true,
      stock,
    });
    res.send({ result: "Product created ok!", payload: result });
  } catch (error) {
    console.log("Error creating product!:", error);
    res.status(500).send({ status: "error", error: "Failed to create the product!" });
  }
}

// Actualiza un producto existente
async function updateProduct(req, res) {
  let { pid } = req.params;
  let productToReplace = req.body;

  if (
    !productToReplace.title ||
    !productToReplace.price ||
    !productToReplace.stock
  ) {
    return res.status(400).send({status: "error",error: "Undefined parameters of products",});
  }
  
  try {
    let result = await productModel.updateOne({ _id: pid }, productToReplace);
    res.send({ result: "Product edited!", payload: result });
  } catch (error) {
    console.log("Error updating product!:", error);
    res.status(500).send({ status: "error", error: "Failed to update the product!" });
  }
}

// Elimina un producto
async function deleteProduct(req, res) {
  let { pid } = req.params;
  try {
    let result = await productModel.deleteOne({ _id: pid });
    res.status(400).send({ result: "Product deleted!", payload: result });
  } catch (error) {
    console.log("Error deleting product!:", error);
    res.status(500).send({ status: "error", error: "Failed to delete the product!" });
  }
}

// Renderiza los productos en el front
async function renderProducts(req, res) {

  const { sort, limit = 10, page = 1, category = "" } = req.query;
  
  const url = `http://localhost:8080/api/products?sort=${sort}&limit=${limit}&page=${page}&category=${category}`;
  
  try {

    const response = await fetch(url);
    const result = await response.json();
    const user = req.session.user;

    res.render("products", {
      products: result.payload,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      sort,
      categories: result.categories,
      user,
    });

  } catch (error) {
    console.log("Error fetching products!", error);
    res.status(500).send({ status: "error", error: "Failed to fetch products!" });
  }
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  renderProducts,
};
