import "reflect-metadata";
import "express-async-errors";
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import userRoute from "./routes/users/users.routes";
import workspaceRoute from "./routes/workspaces/workspace.routes"
import courseRoute from "./routes/courses/courses.routes"
import classroomRoute from "./routes/classroom/classroom.routes"
import "dotenv/config";

const app = express();
app.use(express.json());

app.use('', workspaceRoute);
app.use('', userRoute);
app.use('', courseRoute);
app.use('', classroomRoute);

app.use(handleAppErrorMiddleware);

export default app
