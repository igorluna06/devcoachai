import { STUDY_PLAN_ERROR_CODES, STUDY_PLAN_ERROR_MESSAGES } from "../constants/StudyPlanConstants"

export class InvalidTitleError extends Error {
    private statusCode: number;
    private code: string;
    constructor(message: string) {
        super(message);
        this.name = "InvalidTitleError";
        this.code = STUDY_PLAN_ERROR_CODES.INVALID_TITLE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidLanguageError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(STUDY_PLAN_ERROR_MESSAGES.INVALID_LANGUAGE);
        this.name = "InvalidLanguageError";
        this.code = STUDY_PLAN_ERROR_CODES.INVALID_LANGUAGE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class StudyPlanAlreadyExistsError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(STUDY_PLAN_ERROR_MESSAGES.STUDY_PLAN_ALREADY_EXISTS);
        this.name = "StudyPlanAlreadyExistsError";
        this.code = STUDY_PLAN_ERROR_CODES.STUDY_PLAN_ALREADY_EXISTS;
        this.statusCode = 409;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}