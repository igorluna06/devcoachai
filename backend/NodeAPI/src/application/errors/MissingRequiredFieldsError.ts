import { USE_CASE_ERROR_CODES, USE_CASE_ERROR_MESSAGES } from "../constants/UseCaseConstants";

export class MissingRequiredFieldsError extends Error {

    private code: string;
    private statusCode: number;

    constructor() {
        super(USE_CASE_ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
        this.name = "MissingRequiredFieldsError";
        this.code = USE_CASE_ERROR_CODES.MISSING_REQUIRED_FIELDS;
        this.statusCode = 400;
    }

    getCode(): string {
        return this.code;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}