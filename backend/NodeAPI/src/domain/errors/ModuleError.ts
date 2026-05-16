import { MODULE_ERROR_CODES, MODULE_ERROR_MESSAGES } from "../constants/ModuleConstants"

export class InvalidModuleTitleError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(MODULE_ERROR_MESSAGES.INVALID_TITLE);
        this.name = "InvalidModuleTitleError";
        this.code = MODULE_ERROR_CODES.INVALID_TITLE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidOrderError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(MODULE_ERROR_MESSAGES.INVALID_ORDER);
        this.name = "InvalidOrderError";
        this.code = MODULE_ERROR_CODES.INVALID_ORDER;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class ModuleNotFound extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(MODULE_ERROR_MESSAGES.MODULE_NOT_FOUND);
        this.name = "ModuleNotFoundError";
        this.code = MODULE_ERROR_CODES.MODULE_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}