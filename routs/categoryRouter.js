import express from 'express';
import { createCategory, deleteCategory, updateCategory, getAllCategories, getCategoryById } from '../controllers/categoryController.js';
import { checkAccess } from '../controllers/authController.js';

const categoryRouter = express.Router();

categoryRouter.post("/create", checkAccess, createCategory);
categoryRouter.delete("/:id", checkAccess, deleteCategory);
categoryRouter.put("/:id", checkAccess, updateCategory);
categoryRouter.get("/allCategories", getAllCategories);
categoryRouter.get("/:id", getCategoryById);

export default categoryRouter;