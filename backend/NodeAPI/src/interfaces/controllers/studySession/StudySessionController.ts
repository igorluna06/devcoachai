import { Request, Response, NextFunction } from "express";
import { CreateStudySessionUseCase } from "../../../application/useCases/studySession/CreateStudySessionUseCase";
import { StudySessionSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { GetStudySessionByIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByIdUseCase";
import { GetAllStudySessionUseCase } from "../../../application/useCases/studySession/GetAllStudySessionUseCase";



export class StudySessionController {

    private createStudySessionUseCase: CreateStudySessionUseCase;
    private getStudySessionByIdUseCase: GetStudySessionByIdUseCase;
    private getAllStudySessionUseCase: GetAllStudySessionUseCase;


    constructor(
        createStudySessionUseCase: CreateStudySessionUseCase,
        getStudySessionUseCase: GetStudySessionByIdUseCase,
        getAllStudySessionUseCase: GetAllStudySessionUseCase
    ) {
        this.createStudySessionUseCase = createStudySessionUseCase; 
        this.getStudySessionByIdUseCase = getStudySessionUseCase;
        this.getAllStudySessionUseCase = getAllStudySessionUseCase;
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

    async getStudySessionById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const studySessionId: number = Number(req.params.id);
            const studySession = await this.getStudySessionByIdUseCase.execute(studySessionId);
            res.status(HttpStatusCode.OK).json(studySession);
        } catch (error) {
            next(error);
        }
    }

    async getAllStudySession(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const studySessions = await this.getAllStudySessionUseCase.execute();
            res.json(studySessions);
        } catch (error) {
            next(error);
        }
    }
}
