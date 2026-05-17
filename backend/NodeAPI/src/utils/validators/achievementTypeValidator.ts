import { AchievementType } from "../../domain/enums/AchievementType";
import { InvalidAchievementTypeError } from "../../domain/errors/AchievementError";

export function validateAchievementType(type: string): void {
    if (!Object.values(AchievementType).includes(type as AchievementType)) {
        throw new InvalidAchievementTypeError();
    }
}