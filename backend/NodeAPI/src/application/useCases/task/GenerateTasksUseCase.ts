import { AIService } from "../../../infrastructure/ai/AIService";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { InvalidIdError } from "../../../domain/errors/CommonError";
import { StudyPlanNotFoundError } from "../../../domain/errors/StudyPlanError";
import { ModuleNotFoundError } from "../../../domain/errors/ModuleError";
import { AIParseError } from "../../../infrastructure/errors/AIError";
import { TASK_PROMPTS } from "../../../infrastructure/ai/prompts/TaskPrompt";
import { TaskType } from "../../../domain/enums/TaskType";

export class GenerateTasksUseCase {

    private taskRepository: ITaskRepository;
    private moduleRepository: IModuleRepository;
    private studyPlanRepository: IStudyPlanRepository;
    private aiService: AIService;

    constructor(
        taskRepository: ITaskRepository,
        moduleRepository: IModuleRepository,
        studyPlanRepository: IStudyPlanRepository,
        aiService: AIService
    ) {
        this.taskRepository = taskRepository;
        this.moduleRepository = moduleRepository;
        this.studyPlanRepository = studyPlanRepository;
        this.aiService = aiService;
    }

    async execute(moduleId: number): Promise<Task[]> {

        if (!moduleId || moduleId <= 0) throw new InvalidIdError();

        const module = await this.moduleRepository.findById(moduleId);
        if (!module) throw new ModuleNotFoundError();

        const studyPlan = await this.studyPlanRepository.findById(module.getStudyPlanId());
        if (!studyPlan) throw new StudyPlanNotFoundError();

        const prompt = TASK_PROMPTS.GENERATE_TASKS(
            studyPlan.getTitle(),
            studyPlan.getLanguage(),
            studyPlan.getLevel(),
            module.getModuleTitle(),
            module.getDescription() ?? ""
        );

        const response = await this.aiService.generate(prompt);
        const parsed = this.parseResponse(response);

        const tasks: Task[] = [];

        for (const taskData of parsed.tasks) {
            const task = await this.taskRepository.create(
                Task.create(
                    taskData.title,
                    moduleId,
                    taskData.type as TaskType,
                    taskData.description,
                    taskData.estimatedMinutes
                )
            );
            tasks.push(task);
        }

        return tasks;
    }

    private parseResponse(response: string): any {
        try {
            const clean = response.replace(/```json|```/g, "").trim();
            return JSON.parse(clean);
        } catch {
            throw new AIParseError();
        }
    }
}