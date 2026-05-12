import { Router } from "express";
import { studyPlanEndpoints } from "./studyPlanEndpoints";
import { studyPlanController } from "../../middlewares/studyPlan/studyPlanFactory";

const router = Router();

router.post(studyPlanEndpoints.ROOT, (req, res, next) => studyPlanController.createStudyPlan(req, res, next));

export default router;