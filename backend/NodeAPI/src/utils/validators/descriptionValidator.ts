import { STUDY_PLAN_ERROR_MESSAGES } from "../../domain/constants/StudyPlanConstants";
import { InvalidDescriptionError } from "../../domain/errors/StudyPlanError";

export function validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
        throw new InvalidDescriptionError(STUDY_PLAN_ERROR_MESSAGES.INVALID_DESCRIPTION.EMPTY);
    }
    if (description.length > 500) {
        throw new InvalidDescriptionError(STUDY_PLAN_ERROR_MESSAGES.INVALID_DESCRIPTION.MAX_LENGTH);
    }
}