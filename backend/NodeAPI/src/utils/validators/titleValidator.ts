import { COMMON_ERROR_MESSAGES } from "../../domain/constants/CommonConstants";
import { InvalidTitleError } from "../../domain/errors/CommonError";

export function validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
        throw new InvalidTitleError(COMMON_ERROR_MESSAGES.INVALID_TITLE.EMPTY);
    }
    if (title.length > 100) {
        throw new InvalidTitleError(COMMON_ERROR_MESSAGES.INVALID_TITLE.MAX_LENGTH);
    }
}