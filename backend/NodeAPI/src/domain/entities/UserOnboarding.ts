import { ExperienceLevel } from "../enums/ExperienceLevel";
import { Goal } from "../enums/Goal";
import { Language } from "../enums/Language";
import { Preference } from "../enums/Preference";
import { validateExperienceLevel } from "../../utils/validators/experienceLevelValidator";
import { validateGoal } from "../../utils/validators/goalValidator";
import { validateLanguage } from "../../utils/validators/languageValidator";
import { validatePreference } from "../../utils/validators/preferenceValidator";
import { validateRegion } from "../../utils/validators/regionValidator";
import { validateRecommendedStack } from "../../utils/validators/recommendedStackValidator";

export class UserOnboarding {

    private onboardingId: number | undefined;
    private goal: Goal;
    private preference: Preference;
    private region: string;
    private experienceLevel: ExperienceLevel;
    private recommendedLanguage: Language;
    private recommendedStack: string;
    private completedAt: Date | null;
    private userId: number;

    private constructor(
        goal: Goal,
        preference: Preference,
        region: string,
        experienceLevel: ExperienceLevel,
        recommendedLanguage: Language,
        recommendedStack: string,
        userId: number,
        completedAt: Date | null = null,
        onboardingId?: number
    ) {
        this.goal = goal;
        this.preference = preference;
        this.region = region;
        this.experienceLevel = experienceLevel;
        this.recommendedLanguage = recommendedLanguage;
        this.recommendedStack = recommendedStack;
        this.userId = userId;
        this.completedAt = completedAt;
        this.onboardingId = onboardingId;
    }

    static create(
        goal: Goal,
        preference: Preference,
        region: string,
        experienceLevel: ExperienceLevel,
        recommendedLanguage: Language,
        recommendedStack: string,
        userId: number
    ): UserOnboarding {
        validateGoal(goal);
        validatePreference(preference);
        validateRegion(region);
        validateExperienceLevel(experienceLevel);
        validateLanguage(recommendedLanguage);
        validateRecommendedStack(recommendedStack);
        return new UserOnboarding(goal, preference, region, experienceLevel, recommendedLanguage, recommendedStack, userId);
    }

    static restore(
        onboardingId: number,
        goal: Goal,
        preference: Preference,
        region: string,
        experienceLevel: ExperienceLevel,
        recommendedLanguage: Language,
        recommendedStack: string,
        userId: number,
        completedAt: Date | null
    ): UserOnboarding {
        return new UserOnboarding(goal, preference, region, experienceLevel, recommendedLanguage, recommendedStack, userId, completedAt, onboardingId);
    }

    getOnboardingId(): number | undefined { return this.onboardingId; }
    getGoal(): Goal { return this.goal; }
    getPreference(): Preference { return this.preference; }
    getRegion(): string { return this.region; }
    getExperienceLevel(): ExperienceLevel { return this.experienceLevel; }
    getRecommendedLanguage(): Language { return this.recommendedLanguage; }
    getRecommendedStack(): string { return this.recommendedStack; }
    getCompletedAt(): Date | null { return this.completedAt; }
    getUserId(): number { return this.userId; }

    complete(): void { this.completedAt = new Date(); }
}