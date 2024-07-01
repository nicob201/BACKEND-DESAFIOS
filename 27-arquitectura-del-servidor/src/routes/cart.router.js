import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

// Rutas para GET
router.get("/", cartController.getCarts);
router.get("/:cid", cartController.getCartById);

// Rutas para POST
router.post("/", isAuthenticated, cartController.createCart);

// Rutas para PUT
router.put("/:cid/product/:pid", isAuthenticated, cartController.updateProductUnits);

// Rutas para DELETE
router.delete("/:cid", cartController.deleteCart);
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart);

export default router;
