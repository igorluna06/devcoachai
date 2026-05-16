import { STUDY_PLAN_ERROR_MESSAGES } from "../../domain/constants/StudyPlanConstants";
import { InvalidTitleError } from "../../domain/errors/StudyPlanError";

export function validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
        throw new InvalidTitleError();
    }
    if (title.length > 100) {
        throw new InvalidTitleError();
    }
}