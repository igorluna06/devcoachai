import { Module } from "../../../domain/entities/Module";
import { ModuleNotFound } from "../../../domain/errors/ModuleError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { validateDescription } from "../../../utils/validators/descriptionValidator";
import { UpdateModuleDTO } from "../../DTOs/module/UpdateModuleDTO";

export class UpdateModuleUseCase {

    private moduleRepository: IModuleRepository;

    constructor(moduleRepository: IModuleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async execute(data: UpdateModuleDTO): Promise<Module> {

        if (!data.moduleId || data.moduleId <= 0) {
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(data.moduleId);
        if (!module) {
            throw new ModuleNotFound();
        }

        if (data.title !== undefined) {
            validateTitle(data.title);
            module.setModuleTitle(data.title);
        }

        if (data.description !== undefined) {
            validateDescription(data.description);
            module.setDescription(data.description);
        }

        if (data.estimatedHours !== undefined) {
            module.setEstimatedHours(data.estimatedHours);
        }

        if (data.isCompleted !== undefined) {
            data.isCompleted ? module.complete() : module.uncomplete();
        }

        const updatedModule = await this.moduleRepository.update(module);
        if (!updatedModule) {
            throw new ModuleNotFound();
        }

        return updatedModule;
    }
}