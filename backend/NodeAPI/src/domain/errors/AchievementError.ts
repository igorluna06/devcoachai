import { ACHIEVEMENT_ERROR_CODES, ACHIEVEMENT_ERROR_MESSAGES } from "../constants/AchievementConstants";

export class InvalidAchievementType extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ACHIEVEMENT_ERROR_MESSAGES.INVALID_ACHIEVEMENT_TYPE);
        this.name = "InvalidAchievementTypeError";
        this.code = ACHIEVEMENT_ERROR_CODES.INVALID_ACHIEVEMENT_TYPE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class AchievementNotFound extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ACHIEVEMENT_ERROR_MESSAGES.ACHIEVEMENT_NOT_FOUND);
        this.name = "AchievementNotFoundError";
        this.code = ACHIEVEMENT_ERROR_CODES.ACHIEVEMENT_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}