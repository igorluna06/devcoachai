import { Certificate } from "../../domain/entities/Certificate";
import { ICertificateRepository } from "../../domain/repositories/ICertificateRepository";
import { PrismaCertificateMapper } from "../database/prisma/mappers/PrismaCertificateMapper";
import { prisma } from "../database/prisma/PrismaClient";

export class PrismaCertificateRepository implements ICertificateRepository {

    async create(certificate: Certificate): Promise<Certificate> {
        const created = await prisma.certificate.create({
            data: {
                title: certificate.getTitle(),
                userId: certificate.getUserId(),
                studyPlanId: certificate.getStudyPlanId(),
                issuedAt: certificate.getIssuedAt(),
                shareableUrl: certificate.getShareableUrl(),
            }
        });
        return PrismaCertificateMapper.toDomain(created);
    }

    async findById(id: number): Promise<Certificate | null> {
        const found = await prisma.certificate.findUnique({ where: { id } });
        if (!found) return null;
        return PrismaCertificateMapper.toDomain(found);
    }

    async findAll(): Promise<Certificate[]> {
        const certificates = await prisma.certificate.findMany();
        return certificates.map(c => PrismaCertificateMapper.toDomain(c));
    }

    async findByUserId(userId: number): Promise<Certificate[]> {
        const certificates = await prisma.certificate.findMany({ where: { userId } });
        return certificates.map(c => PrismaCertificateMapper.toDomain(c));
    }

    async findByStudyPlanId(studyPlanId: number): Promise<Certificate[]> {
        const certificates = await prisma.certificate.findMany({ where: { studyPlanId } });
        return certificates.map(c => PrismaCertificateMapper.toDomain(c));
    }

    async update(certificate: Certificate): Promise<Certificate | null> {
        const id = certificate.getCertificateId();
        if (!id) return null;
        const updated = await prisma.certificate.update({
            where: { id },
            data: { shareableUrl: certificate.getShareableUrl() }
        });
        return PrismaCertificateMapper.toDomain(updated);
    }

    async delete(id: number): Promise<void> {
        await prisma.certificate.delete({ where: { id } });
    }
}