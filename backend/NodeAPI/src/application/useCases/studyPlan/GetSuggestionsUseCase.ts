import { InvalidIdError } from "../../../domain/errors/CommonError";
import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { getSuggestions } from "../../../infrastructure/java/javaApiHelper";


export class GetSuggestionsUseCase {

    private studyPlanRepository: IStudyPlanRepository;

    constructor(studyPlanRepository: IStudyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(studyPlanId: number): Promise<any> {
        if (!studyPlanId || studyPlanId <= 0) throw new InvalidIdError();

        const studyPlan = await this.studyPlanRepository.findById(studyPlanId);
        if (!studyPlan) throw new StudyPlanNotFoundError();

        return getSuggestions(studyPlanId);
    }
}