import { validateLanguage } from "../../utils/validators/languageValidator";
import { validateTitle } from "../../utils/validators/titleValidator";
import { validateDescription } from "../../utils/validators/descriptionValidator";
import { Language } from "../enums/Language";
import { Level } from "../enums/Level";
import { InvalidEstimatedDaysError } from "../errors/StudyPlanError";

export class StudyPlan {

    private studyPlanId: number | undefined;
    private title: string;
    private description: string | null;
    private userId: number;
    private language: Language;
    private level: Level;
    private estimatedDays: number | null;
    private isActive: boolean;
    private createdAt: Date;

    private constructor(
        userId: number,
        title: string,
        language: Language,
        level: Level,
        description?: string | null,
        estimatedDays?: number | null,
        isActive: boolean = true,
        studyPlanId?: number
    ) {
        this.studyPlanId = studyPlanId;
        this.title = title;
        this.description = description ?? null;
        this.userId = userId;
        this.language = language;
        this.level = level;
        this.estimatedDays = estimatedDays ?? null;
        this.isActive = isActive;
        this.createdAt = new Date();
    }

    static create(
        userId: number,
        title: string,
        language: Language,
        level: Level,
        description?: string | null,
        estimatedDays?: number | null
    ): StudyPlan {
        validateTitle(title);
        validateLanguage(language);
        if (description) validateDescription(description);
        return new StudyPlan(userId, title, language, level, description, estimatedDays);
    }

    static restore(
        userId: number,
        title: string,
        language: Language,
        level: Level,
        studyPlanId: number,
        description: string | null = null,
        estimatedDays: number | null = null,
        isActive: boolean = true
    ): StudyPlan {
        return new StudyPlan(userId, title, language, level, description, estimatedDays, isActive, studyPlanId);
    }

    getStudyPlanId(): number | undefined { return this.studyPlanId; }
    getUserId(): number { return this.userId; }
    getTitle(): string { return this.title; }
    getDescription(): string | null { return this.description; }
    getLanguage(): Language { return this.language; }
    getLevel(): Level { return this.level; }
    getEstimatedDays(): number | null { return this.estimatedDays; }
    getIsActive(): boolean { return this.isActive; }
    getCreatedAt(): Date { return this.createdAt; }

    setTitle(title: string): void {
        validateTitle(title);
        this.title = title;
    }

    setDescription(description: string): void {
        validateDescription(description);
        this.description = description;
    }

    setLanguage(language: Language): void {
        validateLanguage(language);
        this.language = language;
    }

    setLevel(level: Level): void {
        this.level = level;
    }

    setEstimatedDays(days: number): void {
        if (days <= 0) throw new InvalidEstimatedDaysError();
        this.estimatedDays = days;
    }

    activate(): void { this.isActive = true; }
    deactivate(): void { this.isActive = false; }
}