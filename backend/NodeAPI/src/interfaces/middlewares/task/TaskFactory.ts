import { TaskController } from "../../controllers/task/TaskController";
import { PrismaTaskRepository } from "../../../infrastructure/repositories/PrismaTaskRepository";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { PrismaAchievementRepository } from "../../../infrastructure/repositories/PrismaAchievementRepository";
import { PrismaCertificateRepository } from "../../../infrastructure/repositories/PrismaCertificateRepository";
import { CreateTaskUseCase } from "../../../application/useCases/task/CreateTaskUseCase";
import { GetTaskByIdUseCase } from "../../../application/useCases/task/GetTaskByIdUseCase";
import { GetAllTaskUseCase } from "../../../application/useCases/task/GetAllTaskUseCase";
import { GetTaskByModuleIdUseCase } from "../../../application/useCases/task/GetTaskByModuleIdUseCase";
import { GetTaskByTypeUseCase } from "../../../application/useCases/task/GetTaskByTypeUseCase";
import { DeleteTaskUseCase } from "../../../application/useCases/task/DeleteTaskUseCase";
import { UpdateTaskUseCase } from "../../../application/useCases/task/UpdateTaskUseCase";
import { CompleteTaskUseCase } from "../../../application/useCases/task/CompleteTaskUseCase";
import { GenerateTasksUseCase } from "../../../application/useCases/task/GenerateTasksUseCase";
import { GroqProvider } from "../../../infrastructure/ai/provider/groqProvider";

const prismaTaskRepository = new PrismaTaskRepository();
const prismaModuleRepository = new PrismaModuleRepository();
const prismaStudyPlanRepository = new PrismaStudyPlanRepository();
const prismaUserRepository = new PrismaUserRepository();
const prismaAchievementRepository = new PrismaAchievementRepository();
const prismaCertificateRepository = new PrismaCertificateRepository();

export const taskController = new TaskController(
    new CreateTaskUseCase(prismaTaskRepository, prismaModuleRepository),
    new GetTaskByIdUseCase(prismaTaskRepository),
    new GetAllTaskUseCase(prismaTaskRepository),
    new GetTaskByModuleIdUseCase(prismaTaskRepository, prismaModuleRepository),
    new GetTaskByTypeUseCase(prismaTaskRepository),
    new DeleteTaskUseCase(prismaTaskRepository),
    new UpdateTaskUseCase(prismaTaskRepository),
    new CompleteTaskUseCase(
        prismaTaskRepository,
        prismaModuleRepository,
        prismaStudyPlanRepository,
        prismaUserRepository,
        prismaAchievementRepository,
        prismaCertificateRepository
    ),
    new GenerateTasksUseCase(
        prismaTaskRepository,
        prismaModuleRepository,
        prismaStudyPlanRepository,
        new GroqProvider()
    )
);