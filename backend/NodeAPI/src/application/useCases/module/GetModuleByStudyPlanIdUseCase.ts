import { Module } from "../../../domain/entities/Module";
import { StudyPlanNotFound } from "../../../domain/errors/StudyPlanError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";

export class GetModuleByStudyPlanIdUseCase {

    private moduleRepository: IModuleRepository;
    private studyPlanRepository: IStudyPlanRepository;

    constructor(moduleRepository: IModuleRepository, studyPlanRepository: IStudyPlanRepository) {
        this.moduleRepository = moduleRepository;
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(studyPlanId: number): Promise<Module[]> {

        if(!studyPlanId || studyPlanId <= 0) {
            throw new InvalidIdError();
        }

        const studyPlan = await this.studyPlanRepository.findById(studyPlanId);

        if (!studyPlan) {
            throw new StudyPlanNotFound();
        }

        return this.moduleRepository.findByStudyPlanId(studyPlanId);
    }
}