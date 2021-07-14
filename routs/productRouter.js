import express from 'express';
import { createProduct, deleteProduct, updateProduct, getAllProducts, getProductById } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/create", createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);
productRouter.get("/allProducts", getAllProducts);
productRouter.get("/:id", getProductById);

export default productRouter;