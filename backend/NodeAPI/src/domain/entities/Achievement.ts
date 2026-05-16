import { validateAchievementType } from "../../utils/validators/achievementTypeValidator";
import { validateDescription } from "../../utils/validators/descriptionValidator";
import { validateTitle } from "../../utils/validators/titleValidator";
import { AchievementType } from "../enums/AchievementType";

export class Achievement {

    private achievementId: number | undefined;
    private title: string;
    private description: string;
    private type: AchievementType;
    private unlockedAt: Date;
    private userId: number;

    private constructor(
        title: string,
        description: string,
        type: AchievementType,
        userId: number,
        unlockedAt?: Date,
        achievementId?: number
    ) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.userId = userId;
        this.unlockedAt = unlockedAt ?? new Date();
        this.achievementId = achievementId;
    }

    static create(
        title: string,
        description: string,
        type: AchievementType,
        userId: number
    ): Achievement {
        validateTitle(title);
        validateDescription(description);
        validateAchievementType(type);
        return new Achievement(title, description, type, userId);
    }

    static restore(
        achievementId: number,
        title: string,
        description: string,
        type: AchievementType,
        userId: number,
        unlockedAt: Date
    ): Achievement {
        return new Achievement(title, description, type, userId, unlockedAt, achievementId);
    }

    getAchievementId(): number | undefined { return this.achievementId; }
    getTitle(): string { return this.title; }
    getDescription(): string { return this.description; }
    getType(): AchievementType { return this.type; }
    getUnlockedAt(): Date { return this.unlockedAt; }
    getUserId(): number { return this.userId; }
}