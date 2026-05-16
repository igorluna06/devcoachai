import { AchievementController } from "../../controllers/achievement/AchievementController";
import { PrismaAchievementRepository } from "../../../infrastructure/repositories/PrismaAchievementRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { CreateAchievementUseCase } from "../../../application/useCases/achievement/CreateAchievementUseCase";
import { GetAchievementByIdUseCase } from "../../../application/useCases/achievement/GetAchievementByIdUseCase";
import { GetAllAchievementsUseCase } from "../../../application/useCases/achievement/GetAllAchievementsUseCase";
import { GetAchievementsByUserIdUseCase } from "../../../application/useCases/achievement/GetAchievementsByUserIdUseCase";
import { DeleteAchievementUseCase } from "../../../application/useCases/achievement/DeleteAchievementUseCase";

const achievementRepository = new PrismaAchievementRepository();
const userRepository = new PrismaUserRepository();

export const achievementController = new AchievementController(
    new CreateAchievementUseCase(achievementRepository, userRepository),
    new GetAchievementByIdUseCase(achievementRepository),
    new GetAllAchievementsUseCase(achievementRepository),
    new GetAchievementsByUserIdUseCase(achievementRepository, userRepository),
    new DeleteAchievementUseCase(achievementRepository)
);