import { Achievement } from "../../../domain/entities/Achievement";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";

export class GetAllAchievementsUseCase {

    private achievementRepository: IAchievementRepository;

    constructor(achievementRepository: IAchievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    async execute(): Promise<Achievement[]> {
        return this.achievementRepository.findAll();
    }
}