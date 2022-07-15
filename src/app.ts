import "reflect-metadata";
import express from "express";
import userRouter from "./routes/users/users.routes";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use('', userRouter);

export default app;