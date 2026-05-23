import { CreateStudyPlanUseCase } from "../../../application/useCases/studyPlan/CreateStudyPlanUseCase";
import {NextFunction, Request, Response} from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { StudyPlanSucessMessages } from "../../constants/SucessMessages";
import { CreateStudyPlanDTO } from "../../../application/DTOs/studyPlan/CreateStudyPlanDTO";
import { GetStudyPlanByIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByIdUseCase";
import { GetAllStudyPlanUseCase } from "../../../application/useCases/studyPlan/GetAllStudyPlanUseCase";
import { DeleteStudyPlanUseCase } from "../../../application/useCases/studyPlan/DeleteStudyPlanUseCase";
import { UpdateStudyPlanUseCase } from "../../../application/useCases/studyPlan/updateStudyPlanUseCase";
import { GetStudyPlanByUserIdUseCase } from "../../../application/useCases/studyPlan/GetStudyPlanByUserIdUseCase";
import { GenerateStudyPlanUseCase } from "../../../application/useCases/studyPlan/GenerateStudyPlanUseCase";
import { GetProgressAnalysisUseCase } from "../../../application/useCases/studyPlan/GetProgressAnalysisUseCase";
import { GetSuggestionsUseCase } from "../../../application/useCases/studyPlan/GetSuggestionsUseCase";

export class StudyPlanController{

    private createStudyPlanUseCase: CreateStudyPlanUseCase;
    private getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase;
    private getAllStudyPlanUseCase: GetAllStudyPlanUseCase;
    private deleteStudyPlanUseCase: DeleteStudyPlanUseCase;
    private updateStudyPlanUseCase: UpdateStudyPlanUseCase;
    private getStudyPlanByUserIdUseCase: GetStudyPlanByUserIdUseCase;
    private generateStudyPlanUseCase: GenerateStudyPlanUseCase;
    private getProgressAnalysisUseCase: GetProgressAnalysisUseCase;
    private getSuggestionsUseCase: GetSuggestionsUseCase;

    constructor(
        createStudyPlanUseCase: CreateStudyPlanUseCase,
        getStudyPlanByIdUseCase: GetStudyPlanByIdUseCase,
        getAllStudyPlanUseCase: GetAllStudyPlanUseCase,
        deleteStudyPlanUseCase: DeleteStudyPlanUseCase,
        updateStudyPlanUseCase: UpdateStudyPlanUseCase,
        getStudyPlanByUserIdUseCase: GetStudyPlanByUserIdUseCase,
        generateStudyPlanUseCase: GenerateStudyPlanUseCase,
        getProgressAnalysisUseCase: GetProgressAnalysisUseCase,
        getSuggestionsUseCase: GetSuggestionsUseCase
    ){
        this.createStudyPlanUseCase = createStudyPlanUseCase;
        this.getStudyPlanByIdUseCase = getStudyPlanByIdUseCase;
        this.getAllStudyPlanUseCase = getAllStudyPlanUseCase;
        this.deleteStudyPlanUseCase = deleteStudyPlanUseCase;
        this.updateStudyPlanUseCase = updateStudyPlanUseCase;
        this.getStudyPlanByUserIdUseCase = getStudyPlanByUserIdUseCase;
        this.generateStudyPlanUseCase = generateStudyPlanUseCase;
        this.getProgressAnalysisUseCase = getProgressAnalysisUseCase;
        this.getSuggestionsUseCase = getSuggestionsUseCase;
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

    async generateStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const studyPlan = await this.generateStudyPlanUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({ message: StudyPlanSucessMessages.STUDY_PLAN_CREATED, studyPlan });
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

    async updateStudyPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const data = req.body;
            const updatedStudyPlan = await this.updateStudyPlanUseCase.execute(data);
            res.status(HttpStatusCode.OK).json({message: StudyPlanSucessMessages.STUDY_PLAN_UPDATED, studyPlan: updatedStudyPlan});
        } catch (error) {
            next(error);
        }
    }

    async getStudyPlanByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const studyPlans = await this.getStudyPlanByUserIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(studyPlans);
        } catch (error) {
            next(error);
        }
    }

    async getProgressAnalysis(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studyPlanId: number = Number(req.params.id);
            const analysis = await this.getProgressAnalysisUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json(analysis);
        } catch (error) {
            next(error);
        }
    }

    async getSuggestions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studyPlanId: number = Number(req.params.id);
            const suggestions = await this.getSuggestionsUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json(suggestions);
        } catch (error) {
            next(error);
        }
    }
}