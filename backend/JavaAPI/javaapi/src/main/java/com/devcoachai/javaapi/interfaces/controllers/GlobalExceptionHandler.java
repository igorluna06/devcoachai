package com.devcoachai.javaapi.interfaces.controllers;

import com.devcoachai.javaapi.domain.constants.ExceptionConstants;
import com.devcoachai.javaapi.domain.exceptions.InvalidIdException;
import com.devcoachai.javaapi.domain.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidIdException.class)
    public ResponseEntity<Map<String, String>> handleInvalidId(InvalidIdException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(ExceptionConstants.ERROR_KEY, ex.getMessage(), ExceptionConstants.CODE_KEY, ex.getCode()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(ExceptionConstants.ERROR_KEY, ex.getMessage(), ExceptionConstants.CODE_KEY, ex.getCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneric(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(ExceptionConstants.ERROR_KEY, ExceptionConstants.INTERNAL_SERVER_ERROR_MESSAGE));
    }
}