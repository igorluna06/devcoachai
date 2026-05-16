import { Achievement } from "../../../domain/entities/Achievement";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetAchievementsByUserIdUseCase {

    private achievementRepository: IAchievementRepository;
    private userRepository: IUserRepository;

    constructor(achievementRepository: IAchievementRepository, userRepository: IUserRepository) {
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<Achievement[]> {
        if (!userId || userId <= 0) throw new InvalidIdError();

        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFound();

        return this.achievementRepository.findByUserId(userId);
    }
}