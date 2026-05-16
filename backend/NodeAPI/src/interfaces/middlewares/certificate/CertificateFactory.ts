import { CertificateController } from "../../controllers/certificate/CertificateController";
import { PrismaCertificateRepository } from "../../../infrastructure/repositories/PrismaCertificateRepository";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { PrismaStudyPlanRepository } from "../../../infrastructure/repositories/PrismaStudyPlanRepository";
import { CreateCertificateUseCase } from "../../../application/useCases/certificate/CreateCertificateUseCase";
import { GetCertificateByIdUseCase } from "../../../application/useCases/certificate/GetCertificateByIdUseCase";
import { GetAllCertificatesUseCase } from "../../../application/useCases/certificate/GetAllCertificatesUseCase";
import { GetCertificatesByUserIdUseCase } from "../../../application/useCases/certificate/GetCertificatesByUserIdUseCase";
import { GetCertificatesByStudyPlanIdUseCase } from "../../../application/useCases/certificate/GetCertificatesByStudyPlanIdUseCase";
import { UpdateCertificateUseCase } from "../../../application/useCases/certificate/UpdateCertificateUseCase";
import { DeleteCertificateUseCase } from "../../../application/useCases/certificate/DeleteCertificateUseCase";

const certificateRepository = new PrismaCertificateRepository();
const userRepository = new PrismaUserRepository();
const studyPlanRepository = new PrismaStudyPlanRepository();

export const certificateController = new CertificateController(
    new CreateCertificateUseCase(certificateRepository, userRepository, studyPlanRepository),
    new GetCertificateByIdUseCase(certificateRepository),
    new GetAllCertificatesUseCase(certificateRepository),
    new GetCertificatesByUserIdUseCase(certificateRepository, userRepository),
    new GetCertificatesByStudyPlanIdUseCase(certificateRepository, studyPlanRepository),
    new UpdateCertificateUseCase(certificateRepository),
    new DeleteCertificateUseCase(certificateRepository)
);