import { Achievement } from "../../../domain/entities/Achievement";
import { AchievementNotFound} from "../../../domain/errors/AchievementError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";

export class GetAchievementByIdUseCase {

    private achievementRepository: IAchievementRepository;

    constructor(achievementRepository: IAchievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    async execute(id: number): Promise<Achievement> {
        if (!id || id <= 0) throw new InvalidIdError();

        const achievement = await this.achievementRepository.findById(id);
        if (!achievement) throw new AchievementNotFound();

        return achievement;
    }
}