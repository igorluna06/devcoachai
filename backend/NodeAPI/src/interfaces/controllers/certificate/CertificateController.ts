import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../constants/HttpStatusCode";
import { CertificateSuccessMessages } from "../../constants/SucessMessages";
import { CreateCertificateUseCase } from "../../../application/useCases/certificate/CreateCertificateUseCase";
import { GetCertificateByIdUseCase } from "../../../application/useCases/certificate/GetCertificateByIdUseCase";
import { GetAllCertificatesUseCase } from "../../../application/useCases/certificate/GetAllCertificatesUseCase";
import { GetCertificatesByUserIdUseCase } from "../../../application/useCases/certificate/GetCertificatesByUserIdUseCase";
import { GetCertificatesByStudyPlanIdUseCase } from "../../../application/useCases/certificate/GetCertificatesByStudyPlanIdUseCase";
import { UpdateCertificateUseCase } from "../../../application/useCases/certificate/UpdateCertificateUseCase";
import { DeleteCertificateUseCase } from "../../../application/useCases/certificate/DeleteCertificateUseCase";

export class CertificateController {

    private createCertificateUseCase: CreateCertificateUseCase;
    private getCertificateByIdUseCase: GetCertificateByIdUseCase;
    private getAllCertificatesUseCase: GetAllCertificatesUseCase;
    private getCertificatesByUserIdUseCase: GetCertificatesByUserIdUseCase;
    private getCertificatesByStudyPlanIdUseCase: GetCertificatesByStudyPlanIdUseCase;
    private updateCertificateUseCase: UpdateCertificateUseCase;
    private deleteCertificateUseCase: DeleteCertificateUseCase;

    constructor(
        createCertificateUseCase: CreateCertificateUseCase,
        getCertificateByIdUseCase: GetCertificateByIdUseCase,
        getAllCertificatesUseCase: GetAllCertificatesUseCase,
        getCertificatesByUserIdUseCase: GetCertificatesByUserIdUseCase,
        getCertificatesByStudyPlanIdUseCase: GetCertificatesByStudyPlanIdUseCase,
        updateCertificateUseCase: UpdateCertificateUseCase,
        deleteCertificateUseCase: DeleteCertificateUseCase
    ) {
        this.createCertificateUseCase = createCertificateUseCase;
        this.getCertificateByIdUseCase = getCertificateByIdUseCase;
        this.getAllCertificatesUseCase = getAllCertificatesUseCase;
        this.getCertificatesByUserIdUseCase = getCertificatesByUserIdUseCase;
        this.getCertificatesByStudyPlanIdUseCase = getCertificatesByStudyPlanIdUseCase;
        this.updateCertificateUseCase = updateCertificateUseCase;
        this.deleteCertificateUseCase = deleteCertificateUseCase;
    }

    async createCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const certificate = await this.createCertificateUseCase.execute(data);
            res.status(HttpStatusCode.CREATED).json({ message: CertificateSuccessMessages.CERTIFICATE_CREATED, certificate });
        } catch (error) {
            next(error);
        }
    }

    async getCertificateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const certificate = await this.getCertificateByIdUseCase.execute(id);
            res.status(HttpStatusCode.OK).json(certificate);
        } catch (error) {
            next(error);
        }
    }

    async getAllCertificates(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const certificates = await this.getAllCertificatesUseCase.execute();
            res.status(HttpStatusCode.OK).json(certificates);
        } catch (error) {
            next(error);
        }
    }

    async getCertificatesByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = Number(req.params.userId);
            const certificates = await this.getCertificatesByUserIdUseCase.execute(userId);
            res.status(HttpStatusCode.OK).json(certificates);
        } catch (error) {
            next(error);
        }
    }

    async getCertificatesByStudyPlanId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const studyPlanId: number = Number(req.params.studyPlanId);
            const certificates = await this.getCertificatesByStudyPlanIdUseCase.execute(studyPlanId);
            res.status(HttpStatusCode.OK).json(certificates);
        } catch (error) {
            next(error);
        }
    }

    async updateCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = req.body;
            const updated = await this.updateCertificateUseCase.execute(data);
            res.status(HttpStatusCode.OK).json({ message: CertificateSuccessMessages.CERTIFICATE_UPDATED, certificate: updated });
        } catch (error) {
            next(error);
        }
    }

    async deleteCertificate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.deleteCertificateUseCase.execute(id);
            res.status(HttpStatusCode.OK).json({ message: CertificateSuccessMessages.CERTIFICATE_DELETED });
        } catch (error) {
            next(error);
        }
    }
}