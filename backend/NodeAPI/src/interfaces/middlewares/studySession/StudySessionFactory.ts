import { CreateStudySessionUseCase } from "../../../application/useCases/studySession/CreateStudySessionUseCase";
import { GetAllStudySessionUseCase } from "../../../application/useCases/studySession/GetAllStudySessionUseCase";
import { GetStudySessionByIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByIdUseCase";
import { GetStudySessionByUserIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByUserIdUseCase";
import { PrismaStudySessionRepository } from "../../../infrastructure/repositories/PrismaStudySessionRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { StudySessionController } from "../../controllers/studySession/StudySessionController";


const studySessionRepository = new PrismaStudySessionRepository();
const userRepository = new PrismaUserRepository();

export const studySessionController = new StudySessionController(
    new CreateStudySessionUseCase(studySessionRepository, userRepository),
    new GetStudySessionByIdUseCase(studySessionRepository),
    new GetAllStudySessionUseCase(studySessionRepository),
    new GetStudySessionByUserIdUseCase(studySessionRepository, userRepository)
);