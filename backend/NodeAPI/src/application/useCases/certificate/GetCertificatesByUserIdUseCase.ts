import { Certificate } from "../../../domain/entities/Certificate";
import { InvalidIdError, UserNotFound } from "../../../domain/errors/UserError";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class GetCertificatesByUserIdUseCase {
    private certificateRepository: ICertificateRepository;
    private userRepository: IUserRepository;
    constructor(certificateRepository: ICertificateRepository, userRepository: IUserRepository) {
        this.certificateRepository = certificateRepository;
        this.userRepository = userRepository;
    }
    async execute(userId: number): Promise<Certificate[]> {
        if (!userId || userId <= 0) throw new InvalidIdError();
        const user = await this.userRepository.findById(userId);
        if (!user) throw new UserNotFound();
        return this.certificateRepository.findByUserId(userId);
    }
}