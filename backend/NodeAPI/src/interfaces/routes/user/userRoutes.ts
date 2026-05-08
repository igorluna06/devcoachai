import { Router } from "express";
import { userController } from "../../middlewares/user/userFactory";
import { UserEndpoints } from "./userEndpoints";

const router = Router();

router.post(UserEndpoints.ROOT, (req, res, next) => userController.createUser(req, res, next));
router.put(UserEndpoints.ROOT, (req, res, next) => userController.updateUser(req, res, next));
router.get(UserEndpoints.BY_ID, (req, res, next) => userController.getUserById(req, res, next));
router.get(UserEndpoints.BY_EMAIL, (req, res, next) => userController.getUserByEmail(req, res, next));
router.get(UserEndpoints.ROOT, (req, res, next) => userController.getAllUser(req, res, next));
router.delete(UserEndpoints.BY_ID, (req, res, next) => userController.deleteUser(req, res, next));

export default router;