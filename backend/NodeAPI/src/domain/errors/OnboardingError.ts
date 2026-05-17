import { ONBOARDING_ERROR_CODES, ONBOARDING_ERROR_MESSAGES } from "../constants/OnboardingConstants";

export class InvalidGoalError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_GOAL);
        this.name = "InvalidGoalError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_GOAL;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidPreferenceError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_PREFERENCE);
        this.name = "InvalidPreferenceError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_PREFERENCE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidExperienceLevelError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_EXPERIENCE_LEVEL);
        this.name = "InvalidExperienceLevelError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_EXPERIENCE_LEVEL;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidRegionError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_REGION);
        this.name = "InvalidRegionError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_REGION;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidRecommendedLanguageError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_RECOMMENDED_LANGUAGE);
        this.name = "InvalidRecommendedLanguageError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_RECOMMENDED_LANGUAGE;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class InvalidRecommendedStackError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.INVALID_RECOMMENDED_STACK);
        this.name = "InvalidRecommendedStackError";
        this.code = ONBOARDING_ERROR_CODES.INVALID_RECOMMENDED_STACK;
        this.statusCode = 400;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class OnboardingNotFoundError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.ONBOARDING_NOT_FOUND);
        this.name = "OnboardingNotFoundError";
        this.code = ONBOARDING_ERROR_CODES.ONBOARDING_NOT_FOUND;
        this.statusCode = 404;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class OnboardingAlreadyExistsError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.ONBOARDING_ALREADY_EXISTS);
        this.name = "OnboardingAlreadyExistsError";
        this.code = ONBOARDING_ERROR_CODES.ONBOARDING_ALREADY_EXISTS;
        this.statusCode = 409;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}

export class OnboardingAlreadyCompletedError extends Error {
    private statusCode: number;
    private code: string;
    constructor() {
        super(ONBOARDING_ERROR_MESSAGES.ONBOARDING_ALREADY_COMPLETED);
        this.name = "OnboardingAlreadyCompletedError";
        this.code = ONBOARDING_ERROR_CODES.ONBOARDING_ALREADY_COMPLETED;
        this.statusCode = 409;
    }
    getStatusCode(): number { return this.statusCode; }
    getErrorCode(): string { return this.code; }
}