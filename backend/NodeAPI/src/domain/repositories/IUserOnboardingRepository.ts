import { UserOnboarding } from "../entities/UserOnboarding";

export interface IUserOnboardingRepository {
    create(onboarding: UserOnboarding): Promise<UserOnboarding>;
    findById(id: number): Promise<UserOnboarding | null>;
    findByUserId(userId: number): Promise<UserOnboarding | null>;
    update(onboarding: UserOnboarding): Promise<UserOnboarding | null>;
    delete(id: number): Promise<void>;
}