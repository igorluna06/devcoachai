package com.devcoachai.javaapi.utils.validators;

import com.devcoachai.javaapi.domain.exceptions.InvalidIdException;

public class IdValidator {

    private IdValidator() {}

    public static void validate(Integer id) {
        if (id == null || id <= 0) {
            throw new InvalidIdException();
        }
    }
}
