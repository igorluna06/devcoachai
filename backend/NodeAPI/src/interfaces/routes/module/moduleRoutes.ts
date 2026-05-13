import { Router } from "express";
import { moduleEndpoints } from "./moduleEndpoints";
import { moduleController } from "../../middlewares/module/moduleFactory";

const router = Router();

router.post(moduleEndpoints.ROOT, (req, res, next) => moduleController.createModule(req, res, next));
router.get(moduleEndpoints.BY_ID, (req, res, next) => moduleController.getModuleById(req, res, next)); 

export default router;