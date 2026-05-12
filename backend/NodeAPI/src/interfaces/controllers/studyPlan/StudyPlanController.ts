import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import {NextFunction, Request, Response} from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { StudyPlanSucessMessages } from "../../constants/SucessMessages";
import { CreateStudyPlanDTO } from "../../../application/DTOs/studyPlan/CreateStudyPlanDTO";

export class StudyPlanController{

    private createStudyPlanUseCase: CreateStudyPlanUseCase;

    constructor(
        createStudyPlanUseCase: CreateStudyPlanUseCase
    ){
        this.createStudyPlanUseCase = createStudyPlanUseCase;
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
}