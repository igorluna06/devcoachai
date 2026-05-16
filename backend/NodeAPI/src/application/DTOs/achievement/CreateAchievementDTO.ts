import { AchievementType } from "../../../domain/enums/AchievementType";

export interface CreateAchievementDTO {
    title: string;
    description: string;
    type: AchievementType;
    userId: number;
}