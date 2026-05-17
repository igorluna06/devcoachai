import { ExperienceLevel } from "../../domain/enums/ExperienceLevel";
import { InvalidExperienceLevelError } from "../../domain/errors/OnboardingError";

export function validateExperienceLevel(level: string): void {
    if (!Object.values(ExperienceLevel).includes(level as ExperienceLevel)) {
        throw new InvalidExperienceLevelError();
    }
}