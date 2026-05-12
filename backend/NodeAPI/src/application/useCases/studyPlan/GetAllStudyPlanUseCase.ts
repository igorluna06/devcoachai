import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";

export class GetAllStudyPlanUseCase{

    private studyPlanRepository : IStudyPlanRepository;

    constructor(studyPlanRepository : IStudyPlanRepository){
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(): Promise<StudyPlan[]>{
        return await this.studyPlanRepository.findAll();
    }
}