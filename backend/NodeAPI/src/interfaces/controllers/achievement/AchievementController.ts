import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { AchievementSuccessMessages } from "../../constants/SucessMessages";
import { CreateAchievementUseCase } from "../../../application/useCases/achievement/CreateAchievementUseCase";
import { GetAchievementByIdUseCase } from "../../../application/useCases/achievement/GetAchievementByIdUseCase";
import { GetAllAchievementsUseCase } from "../../../application/useCases/achievement/GetAllAchievementsUseCase";
import { GetAchievementsByUserIdUseCase } from "../../../application/useCases/achievement/GetAchievementsByUserIdUseCase";
import { DeleteAchievementUseCase } from "../../../application/useCases/achievement/DeleteAchievementUseCase";

export class AchievementController {

    private createAchievementUseCase: CreateAchievementUseCase;
    private getAchievementByIdUseCase: GetAchievementByIdUseCase;
    private getAllAchievementsUseCase: GetAllAchievementsUseCase;
    private getAchievementsByUserIdUseCase: GetAchievementsByUserIdUseCase;
    private deleteAchievementUseCase: DeleteAchievementUseCase;

    constructor(
        createAchievementUseCase: CreateAchievementUseCase,
        getAchievementByIdUseCase: GetAchievementByIdUseCase,
        getAllAchievementsUseCase: GetAllAchievementsUseCase,
        getAchievementsByUserIdUseCase: GetAchievementsByUserIdUseCase,
        deleteAchievementUseCase: DeleteAchievementUseCase
    ) {
        this.createAchievementUseCase = createAchievementUseCase;
        this.getAchievementByIdUseCase = getAchievementByIdUseCase;
        this.getAllAchievementsUseCase = getAllAchievementsUseCase;
        this.getAchievementsByUserIdUseCase = getAchievementsByUserIdUseCase;
        this.deleteAchievementUseCase = deleteAchievementUseCase;
    }

    async createAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const achievement = await this.createAchievementUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({ message: AchievementSuccessMessages.ACHIEVEMENT_CREATED, achievement });
        } catch (error) {
            next(error);
        }
    }

    async getAchievementById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const achievement = await this.getAchievementByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json(achievement);
        } catch (error) {
            next(error);
        }
    }

    async getAllAchievements(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const achievements = await this.getAllAchievementsUseCase.execute();
            res.status(HttpStatusCode.OK).json(achievements);
        } catch (error) {
            next(error);
        }
    }

    async getAchievementsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const achievements = await this.getAchievementsByUserIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(achievements);
        } catch (error) {
            next(error);
        }
    }

    async deleteAchievement(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.deleteAchievementUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({ message: AchievementSuccessMessages.ACHIEVEMENT_DELETED });
        } catch (error) {
            next(error);
        }
    }
}