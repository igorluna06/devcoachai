import { StudyPlan } from "../../../../domain/entities/StudyPlan";
import { StudyPlan as PrismaStudyPlan, Language as PrismaLanguage } from "@prisma/client";
import { Language } from "../../../../domain/enums/Language";

const languageMap: Record<PrismaLanguage, Language> = {
    JAVA: Language.JAVA,
    JAVASCRIPT: Language.JAVASCRIPT,
    PYTHON: Language.PYTHON,
};

export class PrismaStudyPlanMapper {
    static toDomain(prismaStudyPlan: PrismaStudyPlan): StudyPlan {
        return StudyPlan.restore(
            prismaStudyPlan.userId,
            prismaStudyPlan.title,
            languageMap[prismaStudyPlan.language],
            prismaStudyPlan.id
        );
    }
}