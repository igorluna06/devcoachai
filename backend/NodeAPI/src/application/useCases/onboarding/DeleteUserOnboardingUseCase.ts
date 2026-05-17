import { OnboardingAlreadyCompletedError, OnboardingNotFoundError } from "../../../domain/errors/OnboardingError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IUserOnboardingRepository } from "../../../domain/repositories/IUserOnboardingRepository";

export class DeleteUserOnboardingUseCase {

    private onboardingRepository: IUserOnboardingRepository;

    constructor(onboardingRepository: IUserOnboardingRepository) {
        this.onboardingRepository = onboardingRepository;
    }

    async execute(id: number): Promise<void> {
        if (!id || id <= 0) throw new InvalidIdError();
        const onboarding = await this.onboardingRepository.findById(id);
        if (!onboarding) throw new OnboardingNotFoundError();
        if (onboarding.getCompletedAt() !== null) {
            throw new OnboardingAlreadyCompletedError();
        }
        await this.onboardingRepository.delete(id);
    }
}