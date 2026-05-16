import { Router } from "express";
import { StudySessionEndpoints } from "./studySessionEndpoints";
import { studySessionController } from "../../middlewares/studySession/StudySessionFactory";

const router = Router();

router.post(StudySessionEndpoints.ROOT, (req, res, next) => studySessionController.createStudySession(req, res, next));
router.get(StudySessionEndpoints.BY_ID, (req, res, next) => studySessionController.getStudySessionById(req, res, next));
router.get(StudySessionEndpoints.ROOT, (req, res, next) => studySessionController.getAllStudySession(req, res, next));
router.get(StudySessionEndpoints.BY_USER_ID, (req, res, next) => studySessionController.getStudySessionByUserId(req, res, next));
router.delete(StudySessionEndpoints.BY_ID, (req, res, next) => studySessionController.deleteStudySession(req, res, next));

export default router;