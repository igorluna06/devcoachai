import { StudyPlan } from "../../../domain/entities/StudyPlan";
import { UserNotFoundError } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetStudyPlanByUserIdUseCase {

    private studyPlanRepository: IStudyPlanRepository;
    private userRepository: IUserRepository;

    constructor(studyPlanRepository: IStudyPlanRepository, userRepository: IUserRepository) {
        this.studyPlanRepository = studyPlanRepository;
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<StudyPlan[]> {

        if(!userId || userId <= 0) {
            throw new InvalidIdError();
        }

        const user = await this.userRepository.findById(userId);

        if(!user) {
            throw new UserNotFoundError();
        }

        const studyPlans = await this.studyPlanRepository.findByUserId(userId);

        return studyPlans;
    }
}