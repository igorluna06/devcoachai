import { TaskController } from "../../controllers/task/TaskController";
import { PrismaTaskRepository } from "../../../infrastructure/repositories/PrismaTaskRepository";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";
import { GetAllTaskUseCase } from "../../../application/useCases/task/GetAllTaskUseCase";
import { GetTaskByModuleIdUseCase } from "../../../application/useCases/task/GetTaskByModuleIdUseCase";
import { GetTaskByTypeUseCase } from "../../../application/useCases/task/GetTaskByTypeUseCase";

const prismaTaskRepository = new PrismaTaskRepository();
const prismaModuleRepository = new PrismaModuleRepository();

export const taskController = new TaskController(
    new CreateTaskUseCase(prismaTaskRepository, prismaModuleRepository),
    new GetTaskByIdUseCase(prismaTaskRepository),
    new GetAllTaskUseCase(prismaTaskRepository),
    new GetTaskByModuleIdUseCase(prismaTaskRepository, prismaModuleRepository),
    new GetTaskByTypeUseCase(prismaTaskRepository)
);