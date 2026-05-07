import { Router } from "express";
import { UserController } from "../../controllers/user/UserController";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { UserEndpoints } from "./userEndpoints";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../../../application/useCases/user/UpdateUserUseCase";
import { GetUserByIdUseCase } from "../../../application/useCases/user/GetUserByIdUseCase";
import { GetAllUserUseCase } from "../../../application/useCases/user/GetAllUserUseCase";

const router = Router();

const userRepository = new PrismaUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getAllUserUseCase = new GetAllUserUseCase(userRepository);

const userController = new UserController(
    createUserUseCase,
    updateUserUseCase,
    getUserByIdUseCase,
    getAllUserUseCase 
);

router.post(UserEndpoints.ROOT, (req, res, next) => userController.createUser(req, res, next));
router.put(UserEndpoints.ROOT, (req, res, next) => userController.updateUser(req, res, next));
router.get(UserEndpoints.BY_ID, (req, res, next) => userController.getUserById(req, res, next));
router.get(UserEndpoints.ROOT, (req, res, next) => userController.getAllUser(req, res, next));

export default router;