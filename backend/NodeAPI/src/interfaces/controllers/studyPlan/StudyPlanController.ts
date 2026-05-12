import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import {NextFunction, Request, Response} from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { StudyPlanSucessMessages } from "../../constants/SucessMessages";
import { CreateStudyPlanDTO } from "../../../application/DTOs/studyPlan/CreateStudyPlanDTO";
import { GetStudyPlanByIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByIdUseCase";

export class StudyPlanController{

    private createStudyPlanUseCase: CreateStudyPlanUseCase;
    private getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase;

    constructor(
        createStudyPlanUseCase: CreateStudyPlanUseCase,
        getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase
    ){
        this.createStudyPlanUseCase = createStudyPlanUseCase;
        this.getStudyPlanByIdUseCase = getStudyPlanByIdUseCase;
    }

    async createStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const data: CreateStudyPlanDTO = req.body;
            const newStudyPlan = await this.createStudyPlanUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: StudyPlanSucessMessages.STUDYPLAN_CREATED, user: newStudyPlan});
        } catch (error) {
            next(error);
        }
    }

    async getStudyPlanById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const studyPlanId: number = Number(req.params.id);
            const studyPlan = await this.getStudyPlanByIdUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json(studyPlan);
        } catch (error) {
            next(error);
        }
    }
}