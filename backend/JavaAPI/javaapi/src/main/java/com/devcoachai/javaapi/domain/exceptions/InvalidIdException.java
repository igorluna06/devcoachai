package com.devcoachai.javaapi.domain.exceptions;

import com.devcoachai.javaapi.domain.constants.ExceptionConstants;

public class InvalidIdException extends RuntimeException {
    private final int statusCode = 400;
    private final String code;

    public InvalidIdException() {
        super(ExceptionConstants.INVALID_ID_MESSAGE);
        this.code = ExceptionConstants.INVALID_ID_CODE;
    }

    public int getStatusCode() { return statusCode; }
    public String getCode() { return code; }
}
