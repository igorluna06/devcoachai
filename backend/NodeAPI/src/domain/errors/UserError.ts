import { USER_ERROR_CODES, USER_ERROR_MESSAGES } from "../constants/UserConstants";

export class InvalidIdError extends Error {
  private statusCode: number;
  private code: string;
  constructor() {
    super(USER_ERROR_MESSAGES.INVALID_ID);
    this.name = "InvalidIdError";
    this.code = USER_ERROR_CODES.INVALID_ID;
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}

export class InvalidNameError extends Error {
  private statusCode: number;
  private code: string;
  constructor(message: string) {
    super(message);
    this.name = "InvalidNameError";
    this.code = USER_ERROR_CODES.INVALID_NAME;
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}

export class InvalidEmailError extends Error {
  private statusCode: number;
  private code: string;
  constructor() {
    super(USER_ERROR_MESSAGES.INVALID_EMAIL);
    this.name = "InvalidEmailError";
    this.code = USER_ERROR_CODES.INVALID_EMAIL;
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}

export class InvalidBirthDateError extends Error {
  private statusCode: number;
  private code: string;
  constructor() {
    super(USER_ERROR_MESSAGES.INVALID_BIRTH_DATE); 
    this.name = "InvalidBirthDateError";
    this.code = USER_ERROR_CODES.INVALID_BIRTH_DATE; 
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}

export class InvalidPasswordError extends Error {
  private statusCode: number;
  private code: string;
  constructor(message: string) {
    super(message);
    this.name = "InvalidPasswordError";
    this.code = USER_ERROR_CODES.INVALID_PASSWORD; 
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}

export class UserNotFound extends Error {
  private statusCode: number;
  private code: string;
  constructor() {
    super(USER_ERROR_MESSAGES.USER_NOT_FOUND);
    this.name = "UserNotFound";
    this.code = USER_ERROR_CODES.USER_NOT_FOUND;
    this.statusCode = 400;
  }
  getStatusCode(): number { return this.statusCode; }
  getErrorCode(): string { return this.code; }
}