import { Router } from "express";
import { AchievementEndpoints } from "./achievementEndpoints";
import { achievementController } from "../../middlewares/achievement/AchievementFactory";

const router = Router();

router.post(AchievementEndpoints.ROOT, (req, res, next) => achievementController.createAchievement(req, res, next));
router.get(AchievementEndpoints.BY_ID, (req, res, next) => achievementController.getAchievementById(req, res, next));
router.get(AchievementEndpoints.ROOT, (req, res, next) => achievementController.getAllAchievements(req, res, next));
router.get(AchievementEndpoints.BY_USER_ID, (req, res, next) => achievementController.getAchievementsByUserId(req, res, next));
router.delete(AchievementEndpoints.BY_ID, (req, res, next) => achievementController.deleteAchievement(req, res, next));

export default router;