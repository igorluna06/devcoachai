import { Router } from "express";
import { moduleEndpoints } from "./moduleEndpoints";
import { moduleController } from "../../middlewares/module/moduleFactory";

const router = Router();

router.post(moduleEndpoints.ROOT, (req, res, next) => moduleController.createModule(req, res, next));
router.get(moduleEndpoints.BY_ID, (req, res, next) => moduleController.getModuleById(req, res, next)); 
router.get(moduleEndpoints.ROOT, (req, res, next) => moduleController.getAllModules(req, res, next));
router.get(moduleEndpoints.BY_STUDY_PLAN_ID, (req, res, next) => moduleController.getModulesByStudyPlanId(req, res, next));
router.delete(moduleEndpoints.BY_ID, (req, res, next) => moduleController.deleteModule(req, res, next));

export default router;