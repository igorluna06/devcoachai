import { Module } from "../../../domain/entities/Module";
import { ModuleNotFound } from "../../../domain/errors/ModuleError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { UpdateModuleDTO } from "../../DTOs/module/UpdateModuleDTO";

export class UpdateModuleUseCase {

    private moduleRepository: IModuleRepository;

    constructor(moduleRepository: IModuleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async execute(data: UpdateModuleDTO): Promise<Module> {

        if(!data.moduleId || data.moduleId <= 0) {
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(data.moduleId);

        if (!module) {
            throw new ModuleNotFound();
        }

        if(data.title !== undefined) {
            validateTitle(data.title);
            module.setModuleTitle(data.title);
        }

        const updatedModule = await this.moduleRepository.update(module);

        if (!updatedModule) {
            throw new ModuleNotFound();
        }

        return updatedModule;
    }
}