import { CreateModuleDTO } from "../../../application/DTOs/module/CreateModuleDTO";
import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { NextFunction, Request, Response } from "express";
import { ModuleSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { GetModuleByIdUseCase } from "../../../application/useCases/module/GetModuleByIdUseCase";

export class ModuleController {
    
    private createModuleUseCase : CreateModuleUseCase;
    private getModuleByIdUseCase: GetModuleByIdUseCase;

    constructor(
        createModuleUseCase: CreateModuleUseCase,
        getModuleByIdUseCase: GetModuleByIdUseCase
    ) {
        this.createModuleUseCase = createModuleUseCase;
        this.getModuleByIdUseCase = getModuleByIdUseCase;
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

    
}