import { USER_ERROR_MESSAGES } from "../../domain/constants/UserConstants";
import { InvalidPasswordError } from "../../domain/errors/UserError";

export function validatePassword(password: string): void {
  if (password.length < 8)
    throw new InvalidPasswordError(USER_ERROR_MESSAGES.INVALID_PASSWORD.MIN_LENGTH);

  if (!/[A-Z]/.test(password))
    throw new InvalidPasswordError(USER_ERROR_MESSAGES.INVALID_PASSWORD.UPPERCASE);

  if (!/[0-9]/.test(password))
    throw new InvalidPasswordError(USER_ERROR_MESSAGES.INVALID_PASSWORD.NUMBER);

  if (!/[!@#$%^&*]/.test(password))
    throw new InvalidPasswordError(USER_ERROR_MESSAGES.INVALID_PASSWORD.SPECIAL_CHAR);
}