import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import userRouter from "./routes/users/users.routes"
import coursesRoutes from "./routes/workspaces/workspace.routes";
import workspaceRoute from "./routes/workspaces/workspace.routes";
import classroomRoute from "./routes/classroom/classroom.routes";

const app = express();
app.use(express.json());

app.use('', workspaceRoute);
app.use('', userRouter);
app.use('', coursesRoutes);
app.use('', classroomRoute);

app.use(handleAppErrorMiddleware);

export default app
