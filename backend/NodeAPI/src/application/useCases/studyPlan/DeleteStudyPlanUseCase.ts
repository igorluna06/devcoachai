import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";

export class DeleteStudyPlanUseCase{

    private studyPlanRepository: IStudyPlanRepository;

    constructor(studyPlanRepository: IStudyPlanRepository){
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(id: number): Promise<void>{

        if(!id || id <= 0){
            throw new InvalidIdError();
        }

        const studyPlanFound = await this.studyPlanRepository.findById(id);

        if(!studyPlanFound){
            throw new StudyPlanNotFoundError();
        }

        await this.studyPlanRepository.delete(id);
    }
}