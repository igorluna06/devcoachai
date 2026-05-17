import { UserOnboarding } from "../../../domain/entities/UserOnboarding";
import { OnboardingNotFoundError } from "../../../domain/errors/OnboardingError";
import { UserNotFound } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IUserOnboardingRepository } from "../../../domain/repositories/IUserOnboardingRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetUserOnboardingByUserIdUseCase {

    private onboardingRepository: IUserOnboardingRepository;
    private userRepository: IUserRepository;

    constructor(onboardingRepository: IUserOnboardingRepository, userRepository: IUserRepository) {
        this.onboardingRepository = onboardingRepository;
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<UserOnboarding> {
        if (!userId || userId <= 0) throw new InvalidIdError();
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFound();
        const onboarding = await this.onboardingRepository.findByUserId(userId);
        if (!onboarding) throw new OnboardingNotFoundError();
        return onboarding;
    }
}