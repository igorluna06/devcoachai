import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { UpdateStudyPlanDTO } from "../../DTOs/studyPlan/UpdateStudyPlanDTO";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { validateDescription } from "../../../utils/validators/descriptionValidator";

export class UpdateStudyPlanUseCase {

    private studyPlanRepository: IStudyPlanRepository;

    constructor(studyPlanRepository: IStudyPlanRepository) {
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(data: UpdateStudyPlanDTO): Promise<StudyPlan> {

        if (!data.studyPlanId || data.studyPlanId <= 0) {
            throw new InvalidIdError();
        }

        const studyPlan = await this.studyPlanRepository.findById(data.studyPlanId);
        if (!studyPlan) {
            throw new StudyPlanNotFoundError();
        }

        if (data.title !== undefined) {
            validateTitle(data.title);
            studyPlan.setTitle(data.title);
        }

        if (data.description !== undefined) {
            validateDescription(data.description);
            studyPlan.setDescription(data.description);
        }

        if (data.estimatedDays !== undefined) {
            studyPlan.setEstimatedDays(data.estimatedDays);
        }

        if (data.isActive !== undefined) {
            data.isActive ? studyPlan.activate() : studyPlan.deactivate();
        }

        const updatedStudyPlan = await this.studyPlanRepository.update(studyPlan);
        if (!updatedStudyPlan) {
            throw new StudyPlanNotFoundError();
        }

        return updatedStudyPlan;
    }
}