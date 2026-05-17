import { Certificate } from "../../../domain/entities/Certificate";
import { UserNotFoundError } from "../../../domain/errors/UserError";
import { InvalidIdError } from "../../../domain/errors/CommonError";
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
        if (!user) throw new UserNotFoundError();
        return this.certificateRepository.findByUserId(userId);
    }
}