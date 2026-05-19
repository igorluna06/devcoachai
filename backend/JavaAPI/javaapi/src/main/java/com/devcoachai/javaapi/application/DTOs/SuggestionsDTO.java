package com.devcoachai.javaapi.application.DTOs;

import java.util.List;

public class SuggestionsDTO {

    private final List<String> suggestions;
    private final String generalStatus;

    public SuggestionsDTO(List<String> suggestions, String generalStatus) {
        this.suggestions = suggestions;
        this.generalStatus = generalStatus;
    }

    public List<String> getSuggestions() { return suggestions; }
    public String getGeneralStatus() { return generalStatus; }
}
