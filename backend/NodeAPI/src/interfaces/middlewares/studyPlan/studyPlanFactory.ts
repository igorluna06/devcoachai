import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import { DeleteStudyPlanUseCase } from "../../../application/useCases/studyPlan/DeleteStudyPlanUseCase";
import { GenerateStudyPlanUseCase } from "../../../application/useCases/studyPlan/GenerateStudyPlanUseCase";
import { GetAllStudyPlanUseCase } from "../../../application/useCases/studyPlan/GetAllStudyPlanUseCase";
import { GetStudyPlanByIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByIdUseCase";
import { GetStudyPlanByUserIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByUserIdUseCase";
import { UpdateStudyPlanUseCase } from "../../../application/useCases/studyPlan/updateStudyPlanUseCase";
import { PrismaModuleRepository } from "../../../infrastructure/repositories/PrismaModuleRepository";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { PrismaTaskRepository } from "../../../infrastructure/repositories/PrismaTaskRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { StudyPlanController } from "../../controllers/studyPlan/StudyPlanController";

const moduleRepository = new PrismaModuleRepository();
const taskRepository = new PrismaTaskRepository();
const studyPlanRepository = new PrismaStudyPlanRepository();
const userRepository = new PrismaUserRepository();

export const studyPlanController = new StudyPlanController(
    new CreateStudyPlanUseCase(studyPlanRepository, userRepository),
    new GetStudyPlanByIdUseCase(studyPlanRepository),
    new GetAllStudyPlanUseCase(studyPlanRepository),
    new DeleteStudyPlanUseCase(studyPlanRepository),
    new UpdateStudyPlanUseCase(studyPlanRepository),
    new GetStudyPlanByUserIdUseCase(studyPlanRepository, userRepository),
    new GenerateStudyPlanUseCase(studyPlanRepository, moduleRepository, taskRepository, userRepository)
);