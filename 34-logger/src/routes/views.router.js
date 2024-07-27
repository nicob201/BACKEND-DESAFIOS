import express from "express";
import * as cartController from "../controllers/cartController.js";
import * as productController from "../controllers/productController.js";
import { isAdmin, isAuthenticated, isNotAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Ruta inicial
router.get("/", isNotAuthenticated, (req, res) => {
  req.logger.info("GET / - Render login");
  res.render("login");
});

// Ruta para ver todos los productos
router.get("/products", isAuthenticated, (req, res, next) => {
  req.logger.info("GET /products - Fetching all products");
  productController.renderProducts(req, res, next).catch((err) => {
    req.logger.error(`Error in GET /products: ${err.message}`);
    next(err);
  });
});

// Ruta para ver formulario de nuevo producto
router.get("/newProduct", isAuthenticated, isAdmin, (req, res) => {
  req.logger.info("GET /newProduct - Render new product form");
  res.render("newProduct", {});
});

// Ruta para ver formulario de edicion de producto
router.get("/editProduct/:id", isAuthenticated, isAdmin, (req, res) => {
  req.logger.info(`GET /editProduct/${req.params.id} - Render edit product form`);
  res.render("editProduct");
});

// Ruta para ver los carritos
router.get("/carts", isAuthenticated, (req, res, next) => {
  req.logger.info("GET /carts - Fetching all carts");
  cartController.renderCarts(req, res, next).catch((err) => {
    req.logger.error(`Error in GET /carts: ${err.message}`);
    next(err);
  });
});

// Session Login
router.get("/login", (req, res) => {
  req.logger.info("GET /login - Render login");
  res.render("login");
});

// Session Register
router.get("/register", isNotAuthenticated, (req, res) => {
  req.logger.info("GET /register - Render register");
  res.render("register");
});

// Session Profile
router.get("/profile", isAuthenticated, (req, res) => {
  req.logger.info("GET /profile - Render profile");
  res.render("profile", { user: req.session.user });
});

// Chat
router.get("/chat", (req, res) => {
  req.logger.info("GET /chat - Render chat");
  res.render("chat", {});
});

export default router;
