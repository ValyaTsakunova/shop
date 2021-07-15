import express from 'express';
import {  createUser,deleteUser, updateUser, getUserById, getAllUsers } from '../controllers/userController.js';
import { checkAccess } from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post("/create", checkAccess, createUser);
userRouter.delete("/:id", checkAccess, deleteUser);
userRouter.put("/:id", updateUser);
userRouter.get("/allUsers", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;