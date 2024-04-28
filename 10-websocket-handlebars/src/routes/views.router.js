import express from "express";
import { getProducts } from "../public/js/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { products: getProducts() });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products: getProducts() });
});

export default router;
