import "reflect-metadata";
import "express-async-errors"
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import coursesRoutes from "./routes/workspaces/workspace.routes";
//import userRouter from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use(coursesRoutes)

app.use(handleAppErrorMiddleware)

//app.use('/users', userRouter);
export default app