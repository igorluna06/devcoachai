import { Achievement as PrismaAchievement, AchievementType as PrismaAchievementType } from "@prisma/client";
import { Achievement } from "../../../../domain/entities/Achievement";
import { AchievementType } from "../../../../domain/enums/AchievementType";

const achievementTypeMap: Record<PrismaAchievementType, AchievementType> = {
    STREAK: AchievementType.STREAK,
    MODULE_COMPLETED: AchievementType.MODULE_COMPLETED,
    PLAN_COMPLETED: AchievementType.PLAN_COMPLETED,
    PRACTICE_FOCUSED: AchievementType.PRACTICE_FOCUSED,
};

export class PrismaAchievementMapper {
    static toDomain(prismaAchievement: PrismaAchievement): Achievement {
        return Achievement.restore(
            prismaAchievement.id,
            prismaAchievement.title,
            prismaAchievement.description,
            achievementTypeMap[prismaAchievement.type],
            prismaAchievement.userId,
            prismaAchievement.unlockedAt
        );
    }
}