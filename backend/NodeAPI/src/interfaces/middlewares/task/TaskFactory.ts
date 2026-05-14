import { TaskController } from "../../controllers/task/TaskController";
import { PrismaTaskRepository } from "../../../infrastructure/repositories/PrismaTaskRepository";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";

const prismaTaskRepository = new PrismaTaskRepository();
const prismaModuleRepository = new PrismaModuleRepository();

export const taskController = new TaskController(
    new CreateTaskUseCase(prismaTaskRepository, prismaModuleRepository),
    new GetTaskByIdUseCase(prismaTaskRepository)
);