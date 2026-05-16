import { Certificate as PrismaCertificate } from "@prisma/client";
import { Certificate } from "../../../../domain/entities/Certificate";

export class PrismaCertificateMapper {
    static toDomain(prismaCertificate: PrismaCertificate): Certificate {
        return Certificate.restore(
            prismaCertificate.id,
            prismaCertificate.title,
            prismaCertificate.userId,
            prismaCertificate.studyPlanId,
            prismaCertificate.issuedAt,
            prismaCertificate.shareableUrl
        );
    }
}