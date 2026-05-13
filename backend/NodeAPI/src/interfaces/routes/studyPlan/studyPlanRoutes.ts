import { Router } from "express";
import { studyPlanEndpoints } from "./studyPlanEndpoints";
import { studyPlanController } from "../../middlewares/studyPlan/studyPlanFactory";

const router = Router();

router.post(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.createStudyPlan(req, res, next));
router.get(studyPlanEndpoints.BY_ID, (req, res, next) => studyPlanController.getStudyPlanById(req, res, next));
router.get(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.getAllStudyPlan(req, res, next));
router.put(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.updateStudyPlan(req, res, next));
router.delete(studyPlanEndpoints.BY_ID, (req, res, next) => studyPlanController.deleteStudyPlan(req, res, next));

export default router;