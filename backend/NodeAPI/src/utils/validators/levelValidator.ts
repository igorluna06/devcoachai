import { Level } from "../../domain/enums/Level";
import { InvalidLevelError } from "../../domain/errors/StudyPlanError";

export function validateLevel(level: string): void {
    if (!Object.values(Level).includes(level as Level)) {
        throw new InvalidLevelError();
    }
}