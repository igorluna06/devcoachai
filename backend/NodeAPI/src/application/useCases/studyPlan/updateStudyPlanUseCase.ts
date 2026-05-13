import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { UpdateStudyPlanDTO } from "../../DTOs/studyPlan/UpdateStudyPlanDTO";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { StudyPlanNotFound } from "../../../domain/errors/StudyPlanError";
import { validateTitle } from "../../../utils/validators/titleValidator";

export class UpdateStudyPlanUseCase {

    private studyPlanRepository: IStudyPlanRepository;

    constructor(studyPlanRepository: IStudyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(data: UpdateStudyPlanDTO): Promise<StudyPlan> {

        if(!data.studyPlanId || data.studyPlanId <= 0) {
            throw new InvalidIdError();
        }

        const studyPlan = await this.studyPlanRepository.findById(data.studyPlanId);

        if (!studyPlan) {
            throw new StudyPlanNotFound();
        }

        if (data.title !== undefined) {
            validateTitle(data.title);
            studyPlan.setTitle(data.title);
        }

        const updatedStudyPlan = await this.studyPlanRepository.update(studyPlan);

        if (!updatedStudyPlan) {
            throw new StudyPlanNotFound();
        }

        return updatedStudyPlan;
    }
}