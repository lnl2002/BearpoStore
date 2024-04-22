import express from 'express';
import * as productController from "../controllers/product.js";

const router = express.Router();
router.post("/", productController.createProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export default router;
