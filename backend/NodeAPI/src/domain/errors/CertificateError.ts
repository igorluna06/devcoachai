import { CERTIFICATE_ERROR_CODES, CERTIFICATE_ERROR_MESSAGES } from "../constants/CertificateConstants";

export class InvalidUrlError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(CERTIFICATE_ERROR_MESSAGES.INVALID_URL);
        this.name = "InvalidUrlError";
        this.code = CERTIFICATE_ERROR_CODES.INVALID_URL;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class CertificateNotFoundError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(CERTIFICATE_ERROR_MESSAGES.CERTIFICATE_NOT_FOUND);
        this.name = "CertificateNotFoundError";
        this.code = CERTIFICATE_ERROR_CODES.CERTIFICATE_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}