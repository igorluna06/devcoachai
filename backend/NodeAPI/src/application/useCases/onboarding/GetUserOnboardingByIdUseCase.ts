import { UserOnboarding } from "../../../domain/entities/UserOnboarding";
import { OnboardingNotFoundError } from "../../../domain/errors/OnboardingError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IUserOnboardingRepository } from "../../../domain/repositories/IUserOnboardingRepository";

export class GetUserOnboardingByIdUseCase {

    private onboardingRepository: IUserOnboardingRepository;

    constructor(onboardingRepository: IUserOnboardingRepository) {
        this.onboardingRepository = onboardingRepository;
    }

    async execute(id: number): Promise<UserOnboarding> {
        if (!id || id <= 0) throw new InvalidIdError();
        const onboarding = await this.onboardingRepository.findById(id);
        if (!onboarding) throw new OnboardingNotFoundError();
        return onboarding;
    }
}