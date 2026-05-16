import { Request, Response, NextFunction } from "express";
import { CreateStudySessionUseCase } from "../../../application/useCases/studySession/CreateStudySessionUseCase";
import { StudySessionSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { GetStudySessionByIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByIdUseCase";
import { GetAllStudySessionUseCase } from "../../../application/useCases/studySession/GetAllStudySessionUseCase";
import { GetStudySessionByUserIdUseCase } from "../../../application/useCases/studySession/GetStudySessionByUserIdUseCase";
import { DeleteStudySessionUseCase } from "../../../application/useCases/studySession/DeleteStudySessionUseCase";



export class StudySessionController {

    private createStudySessionUseCase: CreateStudySessionUseCase;
    private getStudySessionByIdUseCase: GetStudySessionByIdUseCase;
    private getAllStudySessionUseCase: GetAllStudySessionUseCase;
    private getStudySessionByUserIdUseCase: GetStudySessionByUserIdUseCase;
    private deleteStudySessionUseCase: DeleteStudySessionUseCase;


    constructor(
        createStudySessionUseCase: CreateStudySessionUseCase,
        getStudySessionUseCase: GetStudySessionByIdUseCase,
        getAllStudySessionUseCase: GetAllStudySessionUseCase,
        getStudySessionByUserIdUseCase: GetStudySessionByUserIdUseCase,
        deleteStudySessionUseCase: DeleteStudySessionUseCase
        
    ) {
        this.createStudySessionUseCase = createStudySessionUseCase; 
        this.getStudySessionByIdUseCase = getStudySessionUseCase;
        this.getAllStudySessionUseCase = getAllStudySessionUseCase;
        this.getStudySessionByUserIdUseCase = getStudySessionByUserIdUseCase;
        this.deleteStudySessionUseCase = deleteStudySessionUseCase;
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

    async getStudySessionByUserId(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const userId: number = Number(req.params.userId);
            const studySessions = await this.getStudySessionByUserIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(studySessions);
        } catch (error) {
            next(error);
        }
    }

    async deleteStudySession(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const studySessionId: number = Number(req.params.id);
            await this.deleteStudySessionUseCase.execute(studySessionId);
            res.status(HttpStatusCode.OK).json({message: StudySessionSuccessMessages.STUDY_SESSION_DELETED});
        } catch (error) {
            next(error);
        }
    }
}
