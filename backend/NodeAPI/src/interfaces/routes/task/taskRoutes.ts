import { Router } from "express";
import { TaskEndpoints } from "./taskEndpoints";
import { taskController } from "../../middlewares/task/TaskFactory";

const router = Router();

router.post(TaskEndpoints.ROOT, (req, res, next) => taskController.createTask(req, res, next));
router.get(TaskEndpoints.BY_ID, (req, res, next) => taskController.getTaskById(req, res, next));
router.get(TaskEndpoints.ROOT, (req, res, next) => taskController.getAllTask(req, res, next));
router.get(TaskEndpoints.BY_MODULE_ID, (req, res, next) => taskController.getTaskByModuleId(req, res, next));
router.get(TaskEndpoints.BY_TYPE, (req, res, next) => taskController.getTaskByType(req, res, next));
router.patch(TaskEndpoints.ROOT, (req, res, next) => taskController.updateTask(req, res, next))
router.delete(TaskEndpoints.BY_ID, (req, res, next) => taskController.deleteTask(req, res, next));


export default router;

