import { CreateModuleDTO } from "../../../application/DTOs/module/CreateModuleDTO";
import { CreateModuleUseCase } from "../../../application/useCases/module/CreateModuleUseCase";
import { NextFunction, Request, Response } from "express";
import { ModuleSuccessMessages } from "../../constants/SucessMessages";
import { HttpStatusCode } from "../../constants/HttpStatusCode";

export class ModuleController {
    
    private createModuleUseCase : CreateModuleUseCase;

    constructor(createModuleUseCase: CreateModuleUseCase) {
        this.createModuleUseCase = createModuleUseCase;
    }

    async createModule(req: Request, res: Response, next: NextFunction) {

        try{
            const data: CreateModuleDTO = req.body;
            const newModule = await this.createModuleUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({message: ModuleSuccessMessages.MODULE_CREATED, module: newModule});
        } catch (error) {
            next(error);
        }

    }

    
}