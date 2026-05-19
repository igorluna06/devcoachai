package com.devcoachai.javaapi.utils.validators;

import com.devcoachai.javaapi.domain.entities.Module;
import com.devcoachai.javaapi.domain.exceptions.ResourceNotFoundException;

import java.util.List;

public class StudyPlanValidator {

    private StudyPlanValidator() {}

    public static void validateModulesNotEmpty(List<Module> modules) {
        if (modules == null || modules.isEmpty()) {
            throw new ResourceNotFoundException();
        }
    }
}
