import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../../../application/useCases/user/UpdateUserUseCase";
import { GetUserByIdUseCase } from "../../../application/useCases/user/GetUserByIdUseCase";
import { GetAllUserUseCase } from "../../../application/useCases/user/GetAllUserUseCase";
import { GetUserByEmailUseCase } from "../../../application/useCases/user/GetUserByEmailUseCase";
import { DeleteUserUseCase } from "../../../application/useCases/user/DeleteUserUseCase";
import { UserController } from "../../controllers/user/UserController";

const repository = new PrismaUserRepository();

export const userController = new UserController(
    new CreateUserUseCase(repository),
    new UpdateUserUseCase(repository),
    new GetUserByIdUseCase(repository),
    new GetAllUserUseCase(repository),
    new GetUserByEmailUseCase(repository),
    new DeleteUserUseCase(repository)
);