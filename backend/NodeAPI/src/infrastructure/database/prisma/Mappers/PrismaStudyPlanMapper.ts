import { StudyPlan } from "../../../../domain/entities/StudyPlan";
import { StudyPlan as PrismaStudyPlan, Language as PrismaLanguage, Level as PrismaLevel } from "@prisma/client";
import { Language } from "../../../../domain/enums/Language";
import { Level } from "../../../../domain/enums/Level";

const languageMap: Record<PrismaLanguage, Language> = {
    JAVA: Language.JAVA,
    JAVASCRIPT: Language.JAVASCRIPT,
    TYPESCRIPT: Language.TYPESCRIPT,
    PYTHON: Language.PYTHON,
    CSHARP: Language.CSHARP,
    GO: Language.GO,
    RUST: Language.RUST,
    KOTLIN: Language.KOTLIN,
    SWIFT: Language.SWIFT,
    PHP: Language.PHP,
    RUBY: Language.RUBY,
    C: Language.C,
    CPP: Language.CPP,
    DART: Language.DART
};

const levelMap: Record<PrismaLevel, Level> = {
    BEGINNER: Level.BEGINNER,
    INTERMEDIATE: Level.INTERMEDIATE,
    ADVANCED: Level.ADVANCED
};

export class PrismaStudyPlanMapper {
    static toDomain(prismaStudyPlan: PrismaStudyPlan): StudyPlan {
        return StudyPlan.restore(
            prismaStudyPlan.userId,
            prismaStudyPlan.title,
            languageMap[prismaStudyPlan.language],
            levelMap[prismaStudyPlan.level],
            prismaStudyPlan.id,
            prismaStudyPlan.description,
            prismaStudyPlan.estimatedDays,
            prismaStudyPlan.isActive
        );
    }
}