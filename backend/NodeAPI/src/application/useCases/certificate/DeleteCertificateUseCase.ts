import { CertificateNotFound } from "../../../domain/errors/CertificateError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";

export class DeleteCertificateUseCase {
    private certificateRepository: ICertificateRepository;
    constructor(certificateRepository: ICertificateRepository) {
        this.certificateRepository = certificateRepository;
    }
    async execute(id: number): Promise<void> {
        if (!id || id <= 0) throw new InvalidIdError();
        const certificate = await this.certificateRepository.findById(id);
        if (!certificate) throw new CertificateNotFound();
        await this.certificateRepository.delete(id);
    }
}