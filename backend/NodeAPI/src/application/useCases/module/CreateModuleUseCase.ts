import { Module } from "../../../domain/entities/Module";
import { StudyPlanNotFound } from "../../../domain/errors/StudyPlanError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository"
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { validateOrder } from "../../../utils/validators/validateOrder";
import { CreateModuleDTO } from "../../DTOs/module/CreateModuleDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateModuleUseCase {

    private moduleRepository : IModuleRepository;
    private studyPlanRepository : IStudyPlanRepository;

    constructor(moduleRepository: IModuleRepository, studyPlanRepository: IStudyPlanRepository) {
        this.moduleRepository = moduleRepository;
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(data: CreateModuleDTO): Promise<Module>{

        if(!data.studyPlanId || !data.moduleTitle || data.order === undefined) {
            throw new MissingRequiredFieldsError();
        }

        if(!Number.isInteger(data.studyPlanId) || data.studyPlanId <= 0){
            throw new InvalidIdError();
        }

        const studyPlan = await this.studyPlanRepository.findById(data.studyPlanId);

        if(!studyPlan) {
            throw new StudyPlanNotFound();
        }

        validateTitle(data.moduleTitle);
        validateOrder(data.order);

        const createdModule = await this.moduleRepository.create(
            Module.create(
                data.moduleTitle,
                data.order,
                data.studyPlanId
            )
        );

        return createdModule;
    }
}