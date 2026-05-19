package com.devcoachai.javaapi.interfaces.controllers;

import com.devcoachai.javaapi.application.DTOs.ProgressAnalysisDTO;
import com.devcoachai.javaapi.application.DTOs.SuggestionsDTO;
import com.devcoachai.javaapi.application.useCases.AnalyzeProgressUseCase;
import com.devcoachai.javaapi.application.useCases.GenerateSuggestionsUseCase;
import com.devcoachai.javaapi.interfaces.constants.EndpointConstants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(EndpointConstants.PROGRESS_BASE)
public class ProgressController {

    private final AnalyzeProgressUseCase analyzeProgressUseCase;
    private final GenerateSuggestionsUseCase generateSuggestionsUseCase;

    public ProgressController(
            AnalyzeProgressUseCase analyzeProgressUseCase,
            GenerateSuggestionsUseCase generateSuggestionsUseCase
    ) {
        this.analyzeProgressUseCase = analyzeProgressUseCase;
        this.generateSuggestionsUseCase = generateSuggestionsUseCase;
    }

    @GetMapping(EndpointConstants.ANALYZE)
    public ResponseEntity<ProgressAnalysisDTO> analyzeProgress(@PathVariable Integer studyPlanId) {
        ProgressAnalysisDTO result = analyzeProgressUseCase.execute(studyPlanId);
        return ResponseEntity.ok(result);
    }

    @GetMapping(EndpointConstants.SUGGESTIONS)
    public ResponseEntity<SuggestionsDTO> getSuggestions(@PathVariable Integer studyPlanId) {
        SuggestionsDTO result = generateSuggestionsUseCase.execute(studyPlanId);
        return ResponseEntity.ok(result);
    }
}