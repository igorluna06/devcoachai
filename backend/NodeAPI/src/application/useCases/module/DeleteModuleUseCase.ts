import { ModuleNotFound } from "../../../domain/errors/ModuleError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";

export class DeleteModuleUseCase {

    private moduleRepository: IModuleRepository;

    constructor(moduleRepository: IModuleRepository) {
        this.moduleRepository = moduleRepository;
    }

    async execute(id: number): Promise<void> {

        if(!id || id <= 0) {
            throw new InvalidIdError();
        }

        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ModuleNotFound();
        }

        await this.moduleRepository.delete(id);

    }
}