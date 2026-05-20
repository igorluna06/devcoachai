import { ExperienceLevel } from "../../../domain/enums/ExperienceLevel";
import { Goal } from "../../../domain/enums/Goal";
import { Language } from "../../../domain/enums/Language";
import { Level } from "../../../domain/enums/Level";
import { Preference } from "../../../domain/enums/Preference";

export interface GenerateStudyPlanDTO {
    userId: number;
    goal: Goal;
    preference: Preference;
    region: string;
    experienceLevel: ExperienceLevel;
    recommendedLanguage: Language;
    recommendedStack: string;
    level: Level;
}