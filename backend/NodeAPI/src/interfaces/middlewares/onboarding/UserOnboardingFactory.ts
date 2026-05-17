import { UserOnboardingController } from "../../controllers/onboarding/UserOnboardingController";
import { PrismaUserOnboardingRepository } from "../../../infrastructure/repositories/PrismaUserOnboardingRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { CreateUserOnboardingUseCase } from "../../../application/useCases/onboarding/CreateUserOnboardingUseCase";
import { GetUserOnboardingByIdUseCase } from "../../../application/useCases/onboarding/GetUserOnboardingByIdUseCase";
import { GetUserOnboardingByUserIdUseCase } from "../../../application/useCases/onboarding/GetUserOnboardingByUserIdUseCase";
import { CompleteUserOnboardingUseCase } from "../../../application/useCases/onboarding/CompleteUserOnboardingUseCase";
import { DeleteUserOnboardingUseCase } from "../../../application/useCases/onboarding/DeleteUserOnboardingUseCase";

const onboardingRepository = new PrismaUserOnboardingRepository();
const userRepository = new PrismaUserRepository();

export const userOnboardingController = new UserOnboardingController(
    new CreateUserOnboardingUseCase(onboardingRepository, userRepository),
    new GetUserOnboardingByIdUseCase(onboardingRepository),
    new GetUserOnboardingByUserIdUseCase(onboardingRepository, userRepository),
    new CompleteUserOnboardingUseCase(onboardingRepository),
    new DeleteUserOnboardingUseCase(onboardingRepository)
);