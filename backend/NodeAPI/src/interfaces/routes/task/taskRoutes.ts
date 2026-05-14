import { Router } from "express";
import { TaskEndpoints } from "./taskEndpoints";
import { taskController } from "../../middlewares/task/TaskFactory";

const router = Router();

router.post(TaskEndpoints.ROOT, (req, res, next) => taskController.createTask(req, res, next));
router.get(TaskEndpoints.BY_ID, (req, res, next) => taskController.getTaskById(req, res, next))

export default router;

