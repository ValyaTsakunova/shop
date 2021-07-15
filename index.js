import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { authRouter, userRouter, categoryRouter, productRouter, cartRouter, orderRouter } from './routs/index.js';
import { authenticateJWT } from './controllers/authController.js';
mongoose.connect("mongodb://localhost:27017/shop", { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use("/auth", urlencodedParser, authRouter); //проверка токина не нужна
app.use("/user", authenticateJWT, urlencodedParser, userRouter);
app.use("/category", authenticateJWT, urlencodedParser, categoryRouter);
app.use("/product", authenticateJWT, urlencodedParser, productRouter);
app.use("/cart", authenticateJWT, urlencodedParser, cartRouter);
app.use("/order",authenticateJWT, urlencodedParser, orderRouter)

app.use("/", function (request, response) {
  response.send(`Main page`);
});

app.listen(3000);
