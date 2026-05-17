import { Router } from "express";
import { OnboardingEndpoints } from "./onboardingEndpoints";
import { userOnboardingController } from "../../middlewares/onboarding/UserOnboardingFactory";

const router = Router();

router.post(OnboardingEndpoints.ROOT, (req, res, next) => userOnboardingController.createUserOnboarding(req, res, next));
router.get(OnboardingEndpoints.BY_ID, (req, res, next) => userOnboardingController.getUserOnboardingById(req, res, next));
router.get(OnboardingEndpoints.BY_USER_ID, (req, res, next) => userOnboardingController.getUserOnboardingByUserId(req, res, next));
router.patch(OnboardingEndpoints.COMPLETE, (req, res, next) => userOnboardingController.completeUserOnboarding(req, res, next));
router.delete(OnboardingEndpoints.BY_ID, (req, res, next) => userOnboardingController.deleteUserOnboarding(req, res, next));

export default router;