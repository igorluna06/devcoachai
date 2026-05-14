import { Language } from "../../../domain/enums/Language";
import { Level } from "../../../domain/enums/Level";

export interface CreateStudyPlanDTO {
    userId: number;
    title: string;
    language: Language;
    level: Level;
    description?: string;
    estimatedDays?: number;
}