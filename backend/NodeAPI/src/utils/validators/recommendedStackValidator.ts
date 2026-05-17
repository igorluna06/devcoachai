import { InvalidRecommendedStackError } from "../../domain/errors/OnboardingError";

export function validateRecommendedStack(stack: string): void {
    if (!stack || stack.trim().length === 0) {
        throw new InvalidRecommendedStackError();
    }
}