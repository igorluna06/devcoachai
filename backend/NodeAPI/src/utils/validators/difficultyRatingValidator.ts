import { DifficultyRating } from "../../domain/enums/DifficultyRating";
import { InvalidDifficultyRatingError } from "../../domain/errors/TaskError";

export function validateDifficultyRating(rating: string): void {
    if (!Object.values(DifficultyRating).includes(rating as DifficultyRating)) {
        throw new InvalidDifficultyRatingError();
    }
}