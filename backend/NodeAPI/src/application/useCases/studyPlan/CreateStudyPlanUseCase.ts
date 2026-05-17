import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { StudyPlanAlreadyExistsError } from "../../../domain/errors/StudyPlanError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { UserNotFoundError } from "../../../domain/errors/UserError";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { validateLanguage } from "../../../utils/validators/languageValidator";
import { validateTitle } from "../../../utils/validators/titleValidator";
import { validateDescription } from "../../../utils/validators/descriptionValidator";
import { CreateStudyPlanDTO } from "../../DTOs/studyPlan/CreateStudyPlanDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateStudyPlanUseCase {

    private studyPlanRepository: IStudyPlanRepository;
    private userRepository: IUserRepository;

    constructor(studyPlanRepository: IStudyPlanRepository, userRepository: IUserRepository) {
        this.studyPlanRepository = studyPlanRepository;
        this.userRepository = userRepository;
    }

    async execute(data: CreateStudyPlanDTO): Promise<StudyPlan> {

        if (!data.userId || !data.title || !data.language || !data.level) {
            throw new MissingRequiredFieldsError();
        }

        if (!Number.isInteger(data.userId) || data.userId <= 0) {
            throw new InvalidIdError();
        }

        const userFound = await this.userRepository.findById(data.userId);
        if (!userFound) {
            throw new UserNotFoundError();
        }

        validateTitle(data.title);
        validateLanguage(data.language);
        if (data.description) validateDescription(data.description);

        const userStudyPlans = await this.studyPlanRepository.findByUserId(data.userId);
        const alreadyExists = userStudyPlans.some(plan => plan.getLanguage() === data.language);
        if (alreadyExists) {
            throw new StudyPlanAlreadyExistsError();
        }

        const createdStudyPlan = await this.studyPlanRepository.create(
            StudyPlan.create(
                data.userId,
                data.title,
                data.language,
                data.level,
                data.description,
                data.estimatedDays
            )
        );

        return createdStudyPlan;
    }
}