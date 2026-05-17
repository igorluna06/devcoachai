import { Module } from "../../../domain/entities/Module";
import { ModuleNotFoundError } from "../../../domain/errors/ModuleError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";

export class GetModuleByIdUseCase {

    private moduleRepository: IModuleRepository;

    constructor(moduleRepository: IModuleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async execute(id: number): Promise<Module> {

        if(!id || id <= 0) {
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ModuleNotFoundError();
        }

        return module;
    }
}