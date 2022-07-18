import "reflect-metadata";
import "express-async-errors"
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import userRouter from "./routes/users/users.routes";
import "dotenv/config";
import sessionRouters from "./routes/users/session.routes";

const app = express();
app.use(express.json());


app.use(handleAppErrorMiddleware)

app.use('', userRouter);
// app.use('/login', sessionRouters);


//app.use('/users', userRouter);
export default app
