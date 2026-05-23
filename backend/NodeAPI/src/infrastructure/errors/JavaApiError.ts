import { JAVA_API_CODES, JAVA_API_ERROR_MESSAGES } from "../constants/JavaApiConstants";

export class JavaApiError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(JAVA_API_ERROR_MESSAGES.JAVA_API_ERROR);
        this.name = "JavaApiError";
        this.code = JAVA_API_CODES.JAVA_API_ERROR;
        this.statusCode = 502;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}