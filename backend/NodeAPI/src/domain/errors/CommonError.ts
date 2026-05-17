import { COMMON_ERROR_CODES, COMMON_ERROR_MESSAGES } from "../constants/CommonConstants";

export class InvalidIdError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(COMMON_ERROR_MESSAGES.INVALID_ID);
        this.name = "InvalidIdError";
        this.code = COMMON_ERROR_CODES.INVALID_ID;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidTitleError extends Error {
    private statusCode: number;
    private code: string;
    constructor(message: string) {
        super(message);
        this.name = "InvalidTitleError";
        this.code = COMMON_ERROR_CODES.INVALID_TITLE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidDescriptionError extends Error {
    private statusCode: number;
    private code: string;
    constructor(message: string) {
        super(message);
        this.name = "InvalidDescriptionError";
        this.code = COMMON_ERROR_CODES.INVALID_DESCRIPTION;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class MissingRequiredFieldsError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(COMMON_ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        this.name = "MissingRequiredFieldsError";
        this.code = COMMON_ERROR_CODES.MISSING_REQUIRED_FIELDS;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}