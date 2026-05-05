import express from "express";
import cors from 'cors';
import { errorHandler } from "./middlewares/errorHandles";
import { RoutePaths } from "./routes/constants/RoutePaths";
import userRoutes from "./routes/user/userRoutes";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(RoutePaths.USER, userRoutes);

app.use(errorHandler);

export default app;