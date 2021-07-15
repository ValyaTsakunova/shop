import express from 'express';
import { createProduct, deleteProduct, updateProduct, getAllProducts, getProductById } from '../controllers/productController.js';
import { checkAccess } from '../controllers/authController.js';

const productRouter = express.Router();

productRouter.post("/create", checkAccess, createProduct);
productRouter.delete("/:id", checkAccess, deleteProduct);
productRouter.put("/:id", checkAccess, updateProduct);
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/:id", getProductById);

export default productRouter;