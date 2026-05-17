import { AchievementNotFoundError } from "../../../domain/errors/AchievementError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";

export class DeleteAchievementUseCase {

    private achievementRepository: IAchievementRepository;

    constructor(achievementRepository: IAchievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    async execute(id: number): Promise<void> {
        if (!id || id <= 0) throw new InvalidIdError();

        const achievement = await this.achievementRepository.findById(id);
        if (!achievement) throw new AchievementNotFoundError();

        await this.achievementRepository.delete(id);
    }
}