package com.devcoachai.javaapi.domain.exceptions;

import com.devcoachai.javaapi.domain.constants.ExceptionConstants;

public class ResourceNotFoundException extends RuntimeException {
    private final int statusCode = 404;
    private final String code;

    public ResourceNotFoundException() {
        super(ExceptionConstants.STUDY_PLAN_NOT_FOUND_MESSAGE);
        this.code =  ExceptionConstants.STUDY_PLAN_NOT_FOUND_CODE;
    }

    public int getStatusCode() { return statusCode; }
    public String getCode() { return code; }
}
