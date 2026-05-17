import { UserOnboarding as PrismaUserOnboarding, Goal as PrismaGoal, Preference as PrismaPreference, ExperienceLevel as PrismaExperienceLevel, Language as PrismaLanguage } from "@prisma/client";
import { UserOnboarding } from "../../../../domain/entities/UserOnboarding";
import { Goal } from "../../../../domain/enums/Goal";
import { Preference } from "../../../../domain/enums/Preference";
import { ExperienceLevel } from "../../../../domain/enums/ExperienceLevel";
import { Language } from "../../../../domain/enums/Language";

const goalMap: Record<PrismaGoal, Goal> = {
    FRONTEND: Goal.FRONTEND,
    BACKEND: Goal.BACKEND,
    MOBILE: Goal.MOBILE,
    DEVOPS: Goal.DEVOPS,
    AI: Goal.AI,
    GAMES: Goal.GAMES,
};

const preferenceMap: Record<PrismaPreference, Preference> = {
    MORE_JOBS: Preference.MORE_JOBS,
    MODERN_TECH: Preference.MODERN_TECH,
    BOTH: Preference.BOTH,
};

const experienceLevelMap: Record<PrismaExperienceLevel, ExperienceLevel> = {
    ZERO: ExperienceLevel.ZERO,
    BEGINNER: ExperienceLevel.BEGINNER,
    INTERMEDIATE: ExperienceLevel.INTERMEDIATE,
};

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
    DART: Language.DART,
};

export class PrismaUserOnboardingMapper {
    static toDomain(prismaOnboarding: PrismaUserOnboarding): UserOnboarding {
        return UserOnboarding.restore(
            prismaOnboarding.id,
            goalMap[prismaOnboarding.goal],
            preferenceMap[prismaOnboarding.preference],
            prismaOnboarding.region,
            experienceLevelMap[prismaOnboarding.experienceLevel],
            languageMap[prismaOnboarding.recommendedLanguage],
            prismaOnboarding.recommendedStack,
            prismaOnboarding.userId,
            prismaOnboarding.completedAt
        );
    }
}