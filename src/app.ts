import "reflect-metadata";
import express from "express";
import userRouter from "./routes/users/users.routes";
import "dotenv/config";
import sessionRouters from "./routes/users/session.routes";

const app = express();
app.use(express.json());

app.use('', userRouter);
// app.use('/login', sessionRouters);

export default app;