import express from 'express';
import {  createUser,deleteUser, updateUser, getUserById, getAllUsers } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);
userRouter.get("/allUsers", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;