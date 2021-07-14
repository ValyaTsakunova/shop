import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { authRouter, userRouter, categoryRouter, productRouter, cartRouter, orderRouter } from './routs/index.js';
mongoose.connect("mongodb://localhost:27017/test", { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use("/auth", urlencodedParser, authRouter);
app.use("/user", urlencodedParser, userRouter);
app.use("/category", urlencodedParser, categoryRouter);
app.use("/product", urlencodedParser, productRouter);
app.use("/cart", urlencodedParser, cartRouter);
app.use("/order", urlencodedParser, orderRouter)

app.use("/", function (request, response) {
  response.send(`Main page`);
});

app.listen(3000);
