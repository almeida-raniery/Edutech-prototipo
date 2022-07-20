import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import handleAppErrorMiddleware from "./middlewares/handleAppErrorMiddleware";
import express from "express";
import userRoute from "./routes/users/users.routes"
import courseRoute from "./routes/courses/courses.routes";
import workspaceRoute from "./routes/workspaces/workspace.routes";
import classroomRoute from "./routes/classroom/classroom.routes";

const app = express();
app.use(express.json());

app.use('/:workspace_name', userRoute);
app.use('/:workspace_name/courses', courseRoute);
app.use('/:workspace_name/courses/:course_id/classes', classroomRoute);
app.use('', workspaceRoute);

app.use(handleAppErrorMiddleware);

export default app
