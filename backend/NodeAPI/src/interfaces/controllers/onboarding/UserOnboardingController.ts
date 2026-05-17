import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { OnboardingSuccessMessages } from "../../constants/SucessMessages";
import { CreateUserOnboardingUseCase } from "../../../application/useCases/onboarding/CreateUserOnboardingUseCase";
import { GetUserOnboardingByIdUseCase } from "../../../application/useCases/onboarding/GetUserOnboardingByIdUseCase";
import { GetUserOnboardingByUserIdUseCase } from "../../../application/useCases/onboarding/GetUserOnboardingByUserIdUseCase";
import { CompleteUserOnboardingUseCase } from "../../../application/useCases/onboarding/CompleteUserOnboardingUseCase";
import { DeleteUserOnboardingUseCase } from "../../../application/useCases/onboarding/DeleteUserOnboardingUseCase";

export class UserOnboardingController {

    private createUserOnboardingUseCase: CreateUserOnboardingUseCase;
    private getUserOnboardingByIdUseCase: GetUserOnboardingByIdUseCase;
    private getUserOnboardingByUserIdUseCase: GetUserOnboardingByUserIdUseCase;
    private completeUserOnboardingUseCase: CompleteUserOnboardingUseCase;
    private deleteUserOnboardingUseCase: DeleteUserOnboardingUseCase;

    constructor(
        createUserOnboardingUseCase: CreateUserOnboardingUseCase,
        getUserOnboardingByIdUseCase: GetUserOnboardingByIdUseCase,
        getUserOnboardingByUserIdUseCase: GetUserOnboardingByUserIdUseCase,
        completeUserOnboardingUseCase: CompleteUserOnboardingUseCase,
        deleteUserOnboardingUseCase: DeleteUserOnboardingUseCase
    ) {
        this.createUserOnboardingUseCase = createUserOnboardingUseCase;
        this.getUserOnboardingByIdUseCase = getUserOnboardingByIdUseCase;
        this.getUserOnboardingByUserIdUseCase = getUserOnboardingByUserIdUseCase;
        this.completeUserOnboardingUseCase = completeUserOnboardingUseCase;
        this.deleteUserOnboardingUseCase = deleteUserOnboardingUseCase;
    }

    async createUserOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const onboarding = await this.createUserOnboardingUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({ message: OnboardingSuccessMessages.ONBOARDING_CREATED, onboarding });
        } catch (error) {
            next(error);
        }
    }

    async getUserOnboardingById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const onboarding = await this.getUserOnboardingByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json(onboarding);
        } catch (error) {
            next(error);
        }
    }

    async getUserOnboardingByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const onboarding = await this.getUserOnboardingByUserIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(onboarding);
        } catch (error) {
            next(error);
        }
    }

    async completeUserOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const onboarding = await this.completeUserOnboardingUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({ message: OnboardingSuccessMessages.ONBOARDING_COMPLETED, onboarding });
        } catch (error) {
            next(error);
        }
    }

    async deleteUserOnboarding(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.deleteUserOnboardingUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({ message: OnboardingSuccessMessages.ONBOARDING_DELETED });
        } catch (error) {
            next(error);
        }
    }
}