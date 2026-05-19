package com.devcoachai.javaapi.application.DTOs;

import java.util.List;
import java.util.Map;

public class ProgressAnalysisDTO {

    private final Integer totalModules;
    private final Integer completedModules;
    private final Double planProgressPercentage;
    private final Integer totalTasks;
    private final Integer completedTasks;
    private final Map<String, Integer> tasksByDifficulty;
    private final List<String> modulesWithDifficulty;

    public ProgressAnalysisDTO(
            Integer totalModules,
            Integer completedModules,
            Double planProgressPercentage,
            Integer totalTasks,
            Integer completedTasks,
            Map<String, Integer> tasksByDifficulty,
            List<String> modulesWithDifficulty
    ) {
        this.totalModules = totalModules;
        this.completedModules = completedModules;
        this.planProgressPercentage = planProgressPercentage;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.tasksByDifficulty = tasksByDifficulty;
        this.modulesWithDifficulty = modulesWithDifficulty;
    }

    public Integer getTotalModules() { return totalModules; }
    public Integer getCompletedModules() { return completedModules; }
    public Double getPlanProgressPercentage() { return planProgressPercentage; }
    public Integer getTotalTasks() { return totalTasks; }
    public Integer getCompletedTasks() { return completedTasks; }
    public Map<String, Integer> getTasksByDifficulty() { return tasksByDifficulty; }
    public List<String> getModulesWithDifficulty() { return modulesWithDifficulty; }
}
