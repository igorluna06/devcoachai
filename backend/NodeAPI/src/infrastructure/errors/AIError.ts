import { AI_ERROR_CODES, AI_ERROR_MESSAGES } from "../../infrastructure/constants/AIConstants";

export class AIParseError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(AI_ERROR_MESSAGES.PARSE_ERROR);
        this.name = "AIParseError";
        this.code = AI_ERROR_CODES.PARSE_ERROR;
        this.statusCode = 500;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class AIGenerationError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(AI_ERROR_MESSAGES.GENERATION_ERROR);
        this.name = "AIGenerationError";
        this.code = AI_ERROR_CODES.GENERATION_ERROR;
        this.statusCode = 500;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}