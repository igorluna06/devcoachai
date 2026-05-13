import express from "express";
import cors from 'cors';
import { errorHandler } from "./middlewares/errorHandles";
import { RoutePaths } from "./routes/constants/RoutePaths";
import userRoutes from "./routes/user/userRoutes";
import studyPlanRoutes from "./routes/studyPlan/studyPlanRoutes";
import moduleRoutes from "./routes/module/moduleRoutes";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(RoutePaths.USER, userRoutes);
app.use(RoutePaths.STUDY_PLAN, studyPlanRoutes)
app.use(RoutePaths.MODULE, moduleRoutes);

app.use(errorHandler);

export default app;