import { COMMON_ERROR_MESSAGES } from "../../domain/constants/CommonConstants";
import { InvalidDescriptionError } from "../../domain/errors/CommonError";

export function validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
        throw new InvalidDescriptionError(COMMON_ERROR_MESSAGES.INVALID_DESCRIPTION.EMPTY);
    }
    if (description.length > 500) {
        throw new InvalidDescriptionError(COMMON_ERROR_MESSAGES.INVALID_DESCRIPTION.MAX_LENGTH);
    }
}