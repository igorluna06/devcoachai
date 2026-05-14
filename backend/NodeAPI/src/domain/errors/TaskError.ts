import { TASK_ERROR_CODES, TASK_ERROR_MESSAGES } from "../constants/TaskConstants";

export class InvalidTaskTitleError extends Error {
    private statusCode: number;
    private code: string;
    constructor(message: string) {
        super(message);
        this.name = "InvalidTaskTitleError";
        this.code = TASK_ERROR_CODES.INVALID_TITLE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidTaskDescriptionError extends Error {
    private statusCode: number;
    private code: string;
    constructor(message: string) {
        super(message);
        this.name = "InvalidTaskDescriptionError";
        this.code = TASK_ERROR_CODES.INVALID_DESCRIPTION;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidTaskTypeError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(TASK_ERROR_MESSAGES.INVALID_TASK_TYPE);
        this.name = "InvalidTaskTypeError";
        this.code = TASK_ERROR_CODES.INVALID_TASK_TYPE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidEstimatedMinutesError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(TASK_ERROR_MESSAGES.INVALID_ESTIMATED_MINUTES);
        this.name = "InvalidEstimatedMinutesError";
        this.code = TASK_ERROR_CODES.INVALID_ESTIMATED_MINUTES;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class TaskNotFound extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(TASK_ERROR_MESSAGES.TASK_NOT_FOUND);
        this.name = "TaskNotFoundError";
        this.code = TASK_ERROR_CODES.TASK_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidDifficultyRatingError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(TASK_ERROR_MESSAGES.INVALID_DIFFICULTY_RATING);
        this.name = "InvalidDifficultyRatingError";
        this.code = TASK_ERROR_CODES.INVALID_DIFFICULTY_RATING;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}