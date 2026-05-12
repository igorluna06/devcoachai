import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import {NextFunction, Request, Response} from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { StudyPlanSucessMessages } from "../../constants/SucessMessages";
import { CreateStudyPlanDTO } from "../../../application/DTOs/studyPlan/CreateStudyPlanDTO";
import { GetStudyPlanByIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByIdUseCase";
import { GetAllStudyPlanUseCase } from "../../../application/useCases/studyPlan/GetAllStudyPlanUseCase";
import { DeleteStudyPlanUseCase } from "../../../application/useCases/studyPlan/DeleteStudyPlanUseCase";

export class StudyPlanController{

    private createStudyPlanUseCase: CreateStudyPlanUseCase;
    private getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase;
    private getAllStudyPlanUseCase: GetAllStudyPlanUseCase;
    private deleteStudyPlanUseCase: DeleteStudyPlanUseCase;

    constructor(
        createStudyPlanUseCase: CreateStudyPlanUseCase,
        getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase,
        getAllStudyPlanUseCase: GetAllStudyPlanUseCase,
        deleteStudyPlanUseCase: DeleteStudyPlanUseCase
    ){
        this.createStudyPlanUseCase = createStudyPlanUseCase;
        this.getStudyPlanByIdUseCase = getStudyPlanByIdUseCase;
        this.getAllStudyPlanUseCase = getAllStudyPlanUseCase;
        this.deleteStudyPlanUseCase = deleteStudyPlanUseCase
    }

    async createStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const data: CreateStudyPlanDTO = req.body;
            const newStudyPlan = await this.createStudyPlanUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: StudyPlanSucessMessages.STUDY_PLAN_CREATED, user: newStudyPlan});
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

    async getAllStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const studyPlans = await this.getAllStudyPlanUseCase.execute();
            res.json(studyPlans);
        } catch (error) {
            next(error);
        }
    }

    async deleteStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const studyPlanId: number = Number(req.params.id);
            await this.deleteStudyPlanUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json({message: StudyPlanSucessMessages.STUDY_PLAN_DELETED});
        } catch (error) {
            next(error);
        }
    }
}