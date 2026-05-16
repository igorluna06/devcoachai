import { Certificate } from "../../../domain/entities/Certificate";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { StudyPlanNotFound } from "../../../domain/errors/StudyPlanError";
import { CreateCertificateDTO } from "../../DTOs/certificate/CreateCertificateDTO";
import { MissingRequiredFieldsError } from "../../errors/MissingRequiredFieldsError";

export class CreateCertificateUseCase {

    private certificateRepository: ICertificateRepository;
    private userRepository: IUserRepository;
    private studyPlanRepository: IStudyPlanRepository;

    constructor(
        certificateRepository: ICertificateRepository,
        userRepository: IUserRepository,
        studyPlanRepository: IStudyPlanRepository
    ) {
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
        this.studyPlanRepository = studyPlanRepository;
    }

    async execute(data: CreateCertificateDTO): Promise<Certificate> {
        if (!data.title || !data.userId || !data.studyPlanId) {
            throw new MissingRequiredFieldsError();
        }

        if (!Number.isInteger(data.userId) || data.userId <= 0) throw new InvalidIdError();

        const user = await this.userRepository.findById(data.userId);
        if (!user) throw new UserNotFound();

        const studyPlan = await this.studyPlanRepository.findById(data.studyPlanId);
        if (!studyPlan) throw new StudyPlanNotFound();

        return this.certificateRepository.create(
            Certificate.create(data.title, data.userId, data.studyPlanId)
        );
    }
}