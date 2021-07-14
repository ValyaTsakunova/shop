import express from 'express';
import { createCategory, deleteCategory, updateCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.get("/allCategories", getAllCategories);
categoryRouter.get("/:id", getCategoryById);

export default categoryRouter;