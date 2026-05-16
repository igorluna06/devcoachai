import { Achievement } from "../../../domain/entities/Achievement";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateAchievementDTO } from "../../DTOs/achievement/CreateAchievementDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateAchievementUseCase {

    private achievementRepository: IAchievementRepository;
    private userRepository: IUserRepository;

    constructor(achievementRepository: IAchievementRepository, userRepository: IUserRepository) {
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
    }

    async execute(data: CreateAchievementDTO): Promise<Achievement> {

        if (!data.title || !data.description || !data.type || !data.userId) {
            throw new MissingRequiredFieldsError();
        }

        if (!Number.isInteger(data.userId) || data.userId <= 0) {
            throw new InvalidIdError();
        }

        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFound();

        return this.achievementRepository.create(
            Achievement.create(data.title, data.description, data.type, data.userId)
        );
    }
}