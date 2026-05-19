package com.devcoachai.javaapi.application.useCases;

import com.devcoachai.javaapi.application.DTOs.ProgressAnalysisDTO;
import com.devcoachai.javaapi.application.DTOs.SuggestionsDTO;
import com.devcoachai.javaapi.domain.constants.ProgressConstants;
import com.devcoachai.javaapi.domain.constants.SuggestionMessages;
import com.devcoachai.javaapi.utils.validators.IdValidator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GenerateSuggestionsUseCase {

    private final AnalyzeProgressUseCase analyzeProgressUseCase;

    public GenerateSuggestionsUseCase(AnalyzeProgressUseCase analyzeProgressUseCase) {
        this.analyzeProgressUseCase = analyzeProgressUseCase;
    }

    public SuggestionsDTO execute(Integer studyPlanId) {

        IdValidator.validate(studyPlanId);

        ProgressAnalysisDTO analysis = analyzeProgressUseCase.execute(studyPlanId);
        List<String> suggestions = new ArrayList<>();

        if (analysis.getPlanProgressPercentage() == 0) {
            suggestions.add(SuggestionMessages.NOT_STARTED);
        } else if (analysis.getPlanProgressPercentage() < ProgressConstants.STARTING_THRESHOLD) {
            suggestions.add(SuggestionMessages.STARTING);
        } else if (analysis.getPlanProgressPercentage() < ProgressConstants.IN_PROGRESS_THRESHOLD) {
            suggestions.add(SuggestionMessages.IN_PROGRESS);
        } else if (analysis.getPlanProgressPercentage() < ProgressConstants.COMPLETED_THRESHOLD) {
            suggestions.add(SuggestionMessages.ALMOST_DONE);
        } else {
            suggestions.add(SuggestionMessages.COMPLETED);
        }

        if (!analysis.getModulesWithDifficulty().isEmpty()) {
            for (String module : analysis.getModulesWithDifficulty()) {
                suggestions.add(SuggestionMessages.MODULE_WITH_DIFFICULTY + module + SuggestionMessages.MODULE_WITH_DIFFICULTY_SUFFIX);
            }
        }

        Integer hardTasks = analysis.getTasksByDifficulty().get(ProgressConstants.UNRATED);
        if (hardTasks != null && hardTasks > ProgressConstants.MAX_HARD_TASKS_BEFORE_SUGGESTION) {
            suggestions.add(SuggestionMessages.TOO_MANY_HARD_TASKS);
        }

        String generalStatus;
        double progress = analysis.getPlanProgressPercentage();
        if (progress == ProgressConstants.COMPLETED_THRESHOLD) {
            generalStatus = ProgressConstants.STATUS_COMPLETED;
        } else if (progress >= ProgressConstants.IN_PROGRESS_THRESHOLD) {
            generalStatus = ProgressConstants.STATUS_ALMOST_DONE;
        } else if (progress >= ProgressConstants.STARTING_THRESHOLD) {
            generalStatus = ProgressConstants.STATUS_IN_PROGRESS;
        } else {
            generalStatus = ProgressConstants.STATUS_STARTING;
        }

        return new SuggestionsDTO(suggestions, generalStatus);
    }
}