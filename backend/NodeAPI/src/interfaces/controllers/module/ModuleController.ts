import { CreateModuleDTO } from "../../../application/DTOs/module/CreateModuleDTO";
import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { NextFunction, Request, Response } from "express";
import { ModuleSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { GetModuleByIdUseCase } from "../../../application/useCases/module/GetModuleByIdUseCase";
import { GetAllModuleUseCase } from "../../../application/useCases/module/GetAllModuleUseCase";
import { DeleteModuleUseCase } from "../../../application/useCases/module/deleteModuleUseCase";
import { GetModuleByStudyPlanIdUseCase } from "../../../application/useCases/module/GetModuleByStudyPlanIdUseCase";

export class ModuleController {
    
    private createModuleUseCase : CreateModuleUseCase;
    private getModuleByIdUseCase: GetModuleByIdUseCase;
    private getAllModulesUseCase: GetAllModuleUseCase;
    private deleteModuleUseCase: DeleteModuleUseCase;
    private getModuleByStudyPlanIdUseCase: GetModuleByStudyPlanIdUseCase;

    constructor(
        createModuleUseCase: CreateModuleUseCase,
        getModuleByIdUseCase: GetModuleByIdUseCase,
        getAllModulesUseCase: GetAllModuleUseCase,
        deleteModuleUseCase: DeleteModuleUseCase,
        getModuleByStudyPlanIdUseCase: GetModuleByStudyPlanIdUseCase
    ) {
        this.createModuleUseCase = createModuleUseCase;
        this.getModuleByIdUseCase = getModuleByIdUseCase;
        this.getAllModulesUseCase = getAllModulesUseCase;
        this.deleteModuleUseCase = deleteModuleUseCase;
        this.getModuleByStudyPlanIdUseCase = getModuleByStudyPlanIdUseCase;
    }

    async createModule(req: Request, res: Response, next: NextFunction): Promise<void> {

        try{
            const data: CreateModuleDTO = req.body;
            const newModule = await this.createModuleUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: ModuleSuccessMessages.MODULE_CREATED, module: newModule});
        } catch (error) {
            next(error);
        }

    }

    async getModuleById(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const moduleId: number = Number(req.params.id);
            const module = await this.getModuleByIdUseCase.execute(moduleId);
            res.status(HttpStatusCode.OK).json(module);
        } catch (error) {
            next(error);
        }
    }

    async getAllModules(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const modules = await this.getAllModulesUseCase.execute();
            res.status(HttpStatusCode.OK).json(modules);
        } catch (error) {
            next(error);
        }
    }

    async deleteModule(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const moduleId: number = Number(req.params.id);
            await this.deleteModuleUseCase.execute(moduleId);
            res.status(HttpStatusCode.OK).json({message: ModuleSuccessMessages.MODULE_DELETED});
        } catch (error) {
            next(error);
        }   
    }

    async getModulesByStudyPlanId(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const studyPlanId: number = Number(req.params.studyPlanId);
            const modules = await this.getModuleByStudyPlanIdUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json(modules);
        } catch (error) {
            next(error);
        }
    }

}