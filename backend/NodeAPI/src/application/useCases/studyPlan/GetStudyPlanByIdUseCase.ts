import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { StudyPlanNotFound } from "../../../domain/errors/StudyPlanError";
import { StudyPlan } from "../../../domain/entities/StudyPlan";

export class GetStudyPlanByIdUseCase{

    private studyPlanRepository: IStudyPlanRepository;

    constructor(studyPlanRepository: IStudyPlanRepository){
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(id: number): Promise<StudyPlan>{

        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const studyPlanFound = await this.studyPlanRepository.findById(id);

        if(!studyPlanFound){
            throw new StudyPlanNotFound();
        }

        return studyPlanFound;
    }
}