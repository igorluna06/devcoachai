import { StudyPlanController } from "../../controllers/studyPlan/StudyPlanController";
import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { GetStudyPlanByIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByIdUseCase";
import { GetAllStudyPlanUseCase } from "../../../application/useCases/studyPlan/GetAllStudyPlanUseCase";
import { DeleteStudyPlanUseCase } from "../../../application/useCases/studyPlan/DeleteStudyPlanUseCase";
import { UpdateStudyPlanUseCase } from "../../../application/useCases/studyPlan/updateStudyPlanUseCase";

const studyPlanRepository = new PrismaStudyPlanRepository();
const userRepository = new PrismaUserRepository();

export const studyPlanController = new StudyPlanController(
    new CreateStudyPlanUseCase(studyPlanRepository, userRepository),
    new GetStudyPlanByIdUseCase(studyPlanRepository),
    new GetAllStudyPlanUseCase(studyPlanRepository),
    new DeleteStudyPlanUseCase(studyPlanRepository),
    new UpdateStudyPlanUseCase(studyPlanRepository)
);