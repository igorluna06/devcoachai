import { Certificate } from "../../../domain/entities/Certificate";
import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";

export class GetCertificatesByStudyPlanIdUseCase {
    private certificateRepository: ICertificateRepository;
    private studyPlanRepository: IStudyPlanRepository;
    constructor(certificateRepository: ICertificateRepository, studyPlanRepository: IStudyPlanRepository) {
        this.certificateRepository = certificateRepository;
        this.studyPlanRepository = studyPlanRepository;
    }
    async execute(studyPlanId: number): Promise<Certificate[]> {
        if (!studyPlanId || studyPlanId <= 0) throw new InvalidIdError();
        const studyPlan = await this.studyPlanRepository.findById(studyPlanId);
        if (!studyPlan) throw new StudyPlanNotFoundError();
        return this.certificateRepository.findByStudyPlanId(studyPlanId);
    }
}