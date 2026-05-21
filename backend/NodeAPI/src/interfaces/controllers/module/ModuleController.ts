import { CreateModuleDTO } from "../../../application/DTOs/module/CreateModuleDTO";
import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { NextFunction, Request, Response } from "express";
import { ModuleSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { GetModuleByIdUseCase } from "../../../application/useCases/module/GetModuleByIdUseCase";
import { GetAllModuleUseCase } from "../../../application/useCases/module/GetAllModuleUseCase";
import { DeleteModuleUseCase } from "../../../application/useCases/module/DeleteModuleUseCase";
import { GetModuleByStudyPlanIdUseCase } from "../../../application/useCases/module/GetModuleByStudyPlanIdUseCase";
import { UpdateModuleUseCase } from "../../../application/useCases/module/UpdateModuleUseCase";
import { GenerateModulesUseCase } from "../../../application/useCases/module/GenerateModulesUseCase";

export class ModuleController {
    
    private createModuleUseCase : CreateModuleUseCase;
    private getModuleByIdUseCase: GetModuleByIdUseCase;
    private getAllModulesUseCase: GetAllModuleUseCase;
    private deleteModuleUseCase: DeleteModuleUseCase;
    private getModuleByStudyPlanIdUseCase: GetModuleByStudyPlanIdUseCase;
    private updateModuleUseCase: UpdateModuleUseCase;
    private generateModulesUseCase: GenerateModulesUseCase;

    constructor(
        createModuleUseCase: CreateModuleUseCase,
        getModuleByIdUseCase: GetModuleByIdUseCase,
        getAllModulesUseCase: GetAllModuleUseCase,
        deleteModuleUseCase: DeleteModuleUseCase,
        getModuleByStudyPlanIdUseCase: GetModuleByStudyPlanIdUseCase,
        updateModuleUseCase: UpdateModuleUseCase,
        generateModulesUseCase: GenerateModulesUseCase
    ) {
        this.createModuleUseCase = createModuleUseCase;
        this.getModuleByIdUseCase = getModuleByIdUseCase;
        this.getAllModulesUseCase = getAllModulesUseCase;
        this.deleteModuleUseCase = deleteModuleUseCase;
        this.getModuleByStudyPlanIdUseCase = getModuleByStudyPlanIdUseCase;
        this.updateModuleUseCase = updateModuleUseCase;
        this.generateModulesUseCase = generateModulesUseCase;
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

    async generateModules(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studyPlanId: number = Number(req.params.id);
            const modules = await this.generateModulesUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.CREATED).json({ message: ModuleSuccessMessages.MODULE_CREATED, modules });
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

    async updateModule(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            console.log(req.body);
            const data = req.body;
            const updatedModule = await this.updateModuleUseCase.execute(data);
            res.status(HttpStatusCode.OK).json({message: ModuleSuccessMessages.MODULE_UPDATED, module: updatedModule});
        } catch (error) {
            next(error);
        }
    }

}