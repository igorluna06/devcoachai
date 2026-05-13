import { Module } from "../../../domain/entities/Module";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";

export class GetAllModuleUseCase {

    private moduleRepository: IModuleRepository;

    constructor(moduleRepository: IModuleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async execute(): Promise<Module[]> {
        return this.moduleRepository.findAll();
    }
}