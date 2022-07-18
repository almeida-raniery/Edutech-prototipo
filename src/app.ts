import "reflect-metadata";
import "express-async-errors";
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import userRouter from "./routes/users/users.routes";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use('', userRouter);

app.use(handleAppErrorMiddleware);

export default app
