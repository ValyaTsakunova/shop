import express from 'express';
import {  registration, authorization } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post("/registration", registration);
authRouter.post("/login", authorization);

export default authRouter;
