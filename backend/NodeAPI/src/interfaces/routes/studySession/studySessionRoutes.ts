import { Router } from "express";
import { StudySessionEndpoints } from "./studySessionEndpoints";
import { studySessionController } from "../../middlewares/studySession/StudySessionFactory";

const router = Router();

router.post(StudySessionEndpoints.ROOT, (req, res, next) => studySessionController.createStudySession(req, res, next));

export default router;