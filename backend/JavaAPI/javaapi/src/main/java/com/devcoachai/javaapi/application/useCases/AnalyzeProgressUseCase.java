package com.devcoachai.javaapi.application.useCases;

import com.devcoachai.javaapi.utils.validators.IdValidator;
import com.devcoachai.javaapi.utils.validators.StudyPlanValidator;
import org.springframework.stereotype.Service;
import com.devcoachai.javaapi.application.DTOs.ProgressAnalysisDTO;
import com.devcoachai.javaapi.domain.constants.ProgressConstants;
import com.devcoachai.javaapi.domain.entities.Module;
import com.devcoachai.javaapi.domain.entities.Task;
import com.devcoachai.javaapi.domain.enums.DifficultyRating;
import com.devcoachai.javaapi.domain.repositories.ModuleRepository;
import com.devcoachai.javaapi.domain.repositories.TaskRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyzeProgressUseCase {

    private final ModuleRepository moduleRepository;
    private final TaskRepository taskRepository;

    public AnalyzeProgressUseCase(ModuleRepository moduleRepository, TaskRepository taskRepository) {
        this.moduleRepository = moduleRepository;
        this.taskRepository = taskRepository;
    }

    public ProgressAnalysisDTO execute(Integer studyPlanId) {

        IdValidator.validate(studyPlanId);
        List<Module> modules = moduleRepository.findByStudyPlanId(studyPlanId);
        StudyPlanValidator.validateModulesNotEmpty(modules);

        int totalModules = modules.size();
        int completedModules = (int) modules.stream().filter(Module::isCompleted).count();
        double planProgressPercentage = totalModules == 0 ? 0 : (double) completedModules / totalModules * 100;

        int totalTasks = 0;
        int completedTasks = 0;

        Map<String, Integer> tasksByDifficulty = new HashMap<>();
        for (DifficultyRating rating : DifficultyRating.values()) {
            tasksByDifficulty.put(rating.name(), 0);
        }
        tasksByDifficulty.put(ProgressConstants.UNRATED, 0);

        List<String> modulesWithDifficulty = new ArrayList<>();

        for (Module module : modules) {
            List<Task> tasks = taskRepository.findByModuleId(module.getId());
            totalTasks += tasks.size();
            completedTasks += (int) tasks.stream().filter(Task::isCompleted).count();

            long hardTasks = tasks.stream()
                    .filter(t -> DifficultyRating.HARD.equals(t.getDifficultyRating()))
                    .count();

            if (hardTasks > 0) {
                modulesWithDifficulty.add(module.getTitle());
            }

            for (Task task : tasks) {
                if (task.getDifficultyRating() == null) {
                    tasksByDifficulty.merge(ProgressConstants.UNRATED, 1, Integer::sum);
                } else {
                    tasksByDifficulty.merge(task.getDifficultyRating().name(), 1, Integer::sum);
                }
            }
        }

        return new ProgressAnalysisDTO(
                totalModules,
                completedModules,
                planProgressPercentage,
                totalTasks,
                completedTasks,
                tasksByDifficulty,
                modulesWithDifficulty
        );
    }
}