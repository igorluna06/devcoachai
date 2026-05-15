import { STUDY_SESSION_ERROR_CODES, STUDY_SESSION_ERROR_MESSAGES } from "../constants/StudySessionConstants";

export class InvalidMinutesStudied extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(STUDY_SESSION_ERROR_MESSAGES.INVALID_MINUTES_STUDIED);
        this.name = "InvalidMinutesStudiedError";
        this.code = STUDY_SESSION_ERROR_CODES.INVALID_MINUTES_STUDIED;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidTasksCompleted extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(STUDY_SESSION_ERROR_MESSAGES.INVALID_TASKS_COMPLETED);
        this.name = "InvalidTasksCompletedError";
        this.code = STUDY_SESSION_ERROR_CODES.INVALID_TASKS_COMPLETED;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class StudySessionNotFound extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(STUDY_SESSION_ERROR_MESSAGES.STUDY_SESSION_NOT_FOUND);
        this.name = "StudySessionNotFoundError";
        this.code = STUDY_SESSION_ERROR_CODES.STUDY_SESSION_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}