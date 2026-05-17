import { Goal } from "../../domain/enums/Goal";
import { InvalidGoalError } from "../../domain/errors/OnboardingError";

export function validateGoal(goal: string): void {
    if (!Object.values(Goal).includes(goal as Goal)) {
        throw new InvalidGoalError();
    }
}