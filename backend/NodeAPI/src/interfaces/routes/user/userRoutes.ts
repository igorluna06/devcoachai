import { Router } from "express";
import { UserController } from "../../controllers/user/UserController";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { UserEndpoints } from "./userEndpoints";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";

const router = Router();

const userRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

const userController = new UserController(createUserUseCase);

router.post(UserEndpoints.ROOT, (req, res, next) => userController.createUser(req, res, next));

export default router;