import { Router } from "express";
import { TaskEndpoints } from "./TaskEndpoints";
import { taskController } from "../../middlewares/task/TaskFactory";

const router = Router();

router.post(TaskEndpoints.ROOT, (req, res, next) => taskController.createTask(req, res, next));

export default router;

