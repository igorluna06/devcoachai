import { CreateStudySessionUseCase } from "../../../application/useCases/studySession/CreateStudySessionUseCase";
import { GetStudySessionByIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByIdUseCase";
import { PrismaStudySessionRepository } from "../../../infrastructure/repositories/PrismaStudySessionRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { StudySessionController } from "../../controllers/studySession/StudySessionController";


const studySessionRepository = new PrismaStudySessionRepository();
const userRepository = new PrismaUserRepository();

export const studySessionController = new StudySessionController(
    new CreateStudySessionUseCase(studySessionRepository, userRepository),
    new GetStudySessionByIdUseCase(studySessionRepository)
);