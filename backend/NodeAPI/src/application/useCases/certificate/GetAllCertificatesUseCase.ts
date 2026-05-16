import { Certificate } from "../../../domain/entities/Certificate";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";

export class GetAllCertificatesUseCase {
    private certificateRepository: ICertificateRepository;
    constructor(certificateRepository: ICertificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async execute(): Promise<Certificate[]> {
        return this.certificateRepository.findAll();
    }
}