import { Request, Response, NextFunction } from "express";
import { CreateStudySessionUseCase } from "../../../application/useCases/studySession/CreateStudySessionUseCase";
import { StudySessionSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";


export class StudySessionController {

    private createStudySessionUseCase: CreateStudySessionUseCase;

    constructor(
        createStudySessionUseCase: CreateStudySessionUseCase
    ) {
        this.createStudySessionUseCase = createStudySessionUseCase; 
    }

    async createStudySession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const createdStudySession = await this.createStudySessionUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: StudySessionSuccessMessages.STUDY_SESSION_CREATED, studySession: createdStudySession});
        } catch (error) {
            next(error);
        }
    }
}
