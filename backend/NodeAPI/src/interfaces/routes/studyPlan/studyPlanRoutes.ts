import { Router } from "express";
import { studyPlanEndpoints } from "./studyPlanEndpoints";
import { studyPlanController } from "../../middlewares/studyPlan/studyPlanFactory";

const router = Router();

router.post(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.createStudyPlan(req, res, next));
router.post(studyPlanEndpoints.GENERATE, (req, res, next) => studyPlanController.generateStudyPlan(req, res, next));
router.get(studyPlanEndpoints.BY_ID, (req, res, next) => studyPlanController.getStudyPlanById(req, res, next));
router.get(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.getAllStudyPlan(req, res, next));
router.get(studyPlanEndpoints.BY_USER_ID, (req, res, next) => studyPlanController.getStudyPlanByUserId(req, res, next));
router.get(studyPlanEndpoints.BY_ID + studyPlanEndpoints.ANALYSIS, (req, res, next) => studyPlanController.getProgressAnalysis(req, res, next));
router.get(studyPlanEndpoints.BY_ID + studyPlanEndpoints.SUGGESTIONS, (req, res, next) => studyPlanController.getSuggestions(req, res, next));
router.patch(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.updateStudyPlan(req, res, next));
router.delete(studyPlanEndpoints.BY_ID, (req, res, next) => studyPlanController.deleteStudyPlan(req, res, next));

export default router;