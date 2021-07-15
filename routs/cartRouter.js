import express from 'express';
import { createCart, addProductToCart, getCartById } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post("/create", createCart);
cartRouter.post("/addProduct", addProductToCart);
cartRouter.get("/:id", getCartById);

export default cartRouter;