import { UserOnboarding } from "../../../domain/entities/UserOnboarding";
import { OnboardingAlreadyExistsError } from "../../../domain/errors/OnboardingError";
import { UserNotFound } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IUserOnboardingRepository } from "../../../domain/repositories/IUserOnboardingRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { CreateUserOnboardingDTO } from "../../DTOs/onboarding/CreateUserOnboardingDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateUserOnboardingUseCase {

    private onboardingRepository: IUserOnboardingRepository;
    private userRepository: IUserRepository;

    constructor(onboardingRepository: IUserOnboardingRepository, userRepository: IUserRepository) {
        this.onboardingRepository = onboardingRepository;
        this.userRepository = userRepository;
    }

    async execute(data: CreateUserOnboardingDTO): Promise<UserOnboarding> {

        if (!data.userId || !data.goal || !data.preference || !data.region || !data.experienceLevel || !data.recommendedLanguage || !data.recommendedStack) {
            throw new MissingRequiredFieldsError();
        }

        if (!Number.isInteger(data.userId) || data.userId <= 0) throw new InvalidIdError();

        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFound();

        const existingOnboarding = await this.onboardingRepository.findByUserId(data.userId);
        if (existingOnboarding) throw new OnboardingAlreadyExistsError();

        return this.onboardingRepository.create(
            UserOnboarding.create(
                data.goal,
                data.preference,
                data.region,
                data.experienceLevel,
                data.recommendedLanguage,
                data.recommendedStack,
                data.userId
            )
        );
    }
}