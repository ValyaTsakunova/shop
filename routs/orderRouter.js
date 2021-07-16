import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getOrderById } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/create/:id", createOrder);
orderRouter.delete("/:id", deleteOrder)
orderRouter.get("/getAllOrders", getAllOrders);
orderRouter.get("/:id", getOrderById);

export default orderRouter;