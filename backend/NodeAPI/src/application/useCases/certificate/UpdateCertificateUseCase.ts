import { Certificate } from "../../../domain/entities/Certificate";
import { CertificateNotFoundError } from "../../../domain/errors/CertificateError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";
import { UpdateCertificateDTO } from "../../DTOs/certificate/UpdateCertificateDTO";

export class UpdateCertificateUseCase {
    private certificateRepository: ICertificateRepository;
    constructor(certificateRepository: ICertificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async execute(data: UpdateCertificateDTO): Promise<Certificate> {
        if (!data.certificateId || data.certificateId <= 0) throw new InvalidIdError();

        const certificate = await this.certificateRepository.findById(data.certificateId);
        if (!certificate) throw new CertificateNotFoundError();

        certificate.setShareableUrl(data.shareableUrl);
        
        const updated = await this.certificateRepository.update(certificate);
        if (!updated) throw new CertificateNotFoundError();

        return updated;
    }
}