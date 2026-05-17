import express from "express";
import cors from 'cors';
import { errorHandler } from "./middlewares/errorHandles";
import { RoutePaths } from "./routes/constants/RoutePaths";
import userRoutes from "./routes/user/userRoutes";
import studyPlanRoutes from "./routes/studyPlan/studyPlanRoutes";
import moduleRoutes from "./routes/module/moduleRoutes";
import TaskRoutes from "./routes/task/taskRoutes";
import studySessionRoutes from "./routes/studySession/studySessionRoutes";
import achievementRoutes from "./routes/achievement/achievementRoutes";
import certificateRoutes from "./routes/certificate/certificateRoutes";
import onboardingRoutes from "./routes/onboarding/onboardingRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json());
app.use(RoutePaths.USER, userRoutes);

app.use(RoutePaths.STUDY_PLAN, authMiddleware, studyPlanRoutes);
app.use(RoutePaths.MODULE, authMiddleware, moduleRoutes);
app.use(RoutePaths.TASK, authMiddleware, TaskRoutes);
app.use(RoutePaths.STUDY_SESSION, authMiddleware, studySessionRoutes);
app.use(RoutePaths.ACHIEVEMENT, authMiddleware, achievementRoutes);
app.use(RoutePaths.CERTIFICATE, authMiddleware, certificateRoutes);
app.use(RoutePaths.ONBOARDING, authMiddleware, onboardingRoutes);

app.use(errorHandler);

export default app;