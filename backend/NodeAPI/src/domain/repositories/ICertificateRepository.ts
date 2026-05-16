import { Certificate } from "../entities/Certificate";

export interface ICertificateRepository {
    create(certificate: Certificate): Promise<Certificate>;
    findById(id: number): Promise<Certificate | null>;
    findAll(): Promise<Certificate[]>;
    findByUserId(userId: number): Promise<Certificate[]>;
    findByStudyPlanId(studyPlanId: number): Promise<Certificate[]>;
    update(certificate: Certificate): Promise<Certificate | null>;
    delete(id: number): Promise<void>;
}