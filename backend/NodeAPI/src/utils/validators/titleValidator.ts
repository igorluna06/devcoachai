import { STUDY_PLAN_ERROR_MESSAGES } from "../../domain/constants/StudyPlanConstants";
import { InvalidTitleError } from "../../domain/errors/StudyPlanError";

export function validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
        throw new InvalidTitleError(STUDY_PLAN_ERROR_MESSAGES.INVALID_TITLE.EMPTY);
    }
    if (title.length > 50) {
        throw new InvalidTitleError(STUDY_PLAN_ERROR_MESSAGES.INVALID_TITLE.MAX_LENGTH);
    }
}