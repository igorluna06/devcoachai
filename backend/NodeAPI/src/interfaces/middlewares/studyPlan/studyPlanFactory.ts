import { StudyPlanController } from "../../controllers/studyPlan/StudyPlanController";
import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";

const studyPlanRepository = new PrismaStudyPlanRepository();
const userRepository = new PrismaUserRepository();

export const studyPlanController = new StudyPlanController(
    new CreateStudyPlanUseCase(studyPlanRepository, userRepository)
);