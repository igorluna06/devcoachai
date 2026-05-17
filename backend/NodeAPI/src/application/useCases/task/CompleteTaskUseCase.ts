import { Task } from "../../../domain/entities/Task";
import { TaskNotFound } from "../../../domain/errors/TaskError";
import { InvalidIdError } from "../../../domain/errors/UserError";
import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { IStudyPlanRepository } from "../../../domain/repositories/IStudyPlanRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IAchievementRepository } from "../../../domain/repositories/IAchievementRepository";
import { ICertificateRepository } from "../../../domain/repositories/ICertificateRepository";
import { Achievement } from "../../../domain/entities/Achievement";
import { Certificate } from "../../../domain/entities/Certificate";
import { AchievementType } from "../../../domain/enums/AchievementType";

export class CompleteTaskUseCase {

    private taskRepository: ITaskRepository;
    private moduleRepository: IModuleRepository;
    private studyPlanRepository: IStudyPlanRepository;
    private userRepository: IUserRepository;
    private achievementRepository: IAchievementRepository;
    private certificateRepository: ICertificateRepository;

    constructor(
        taskRepository: ITaskRepository,
        moduleRepository: IModuleRepository,
        studyPlanRepository: IStudyPlanRepository,
        userRepository: IUserRepository,
        achievementRepository: IAchievementRepository,
        certificateRepository: ICertificateRepository
    ) {
        this.taskRepository = taskRepository;
        this.moduleRepository = moduleRepository;
        this.studyPlanRepository = studyPlanRepository;
        this.userRepository = userRepository;
        this.achievementRepository = achievementRepository;
        this.certificateRepository = certificateRepository;
    }

    async execute(taskId: number, userId: number): Promise<Task> {

        if (!taskId || taskId <= 0) throw new InvalidIdError();
        if (!userId || userId <= 0) throw new InvalidIdError();

        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFound();

        task.complete();
        await this.taskRepository.update(task);

        const module = await this.moduleRepository.findById(task.getModuleId());
        if (!module) return task;

        const moduleTasks = await this.taskRepository.findByModuleId(module.getModuleId()!);
        const allTasksCompleted = moduleTasks.every(t => t.getIsCompleted());

        if (allTasksCompleted) {
            module.complete();
            await this.moduleRepository.update(module);

            await this.achievementRepository.create(
                Achievement.create(
                    "Módulo Concluído",
                    `Você concluiu o módulo: ${module.getModuleTitle()}`,
                    AchievementType.MODULE_COMPLETED,
                    userId
                )
            );

            const studyPlan = await this.studyPlanRepository.findById(module.getStudyPlanId());
            if (!studyPlan) return task;

            const planModules = await this.moduleRepository.findByStudyPlanId(studyPlan.getStudyPlanId()!);
            const allModulesCompleted = planModules.every(m => m.getIsCompleted());

            if (allModulesCompleted) {
                studyPlan.deactivate();
                await this.studyPlanRepository.update(studyPlan);

                await this.achievementRepository.create(
                    Achievement.create(
                        "Plano Concluído",
                        `Você concluiu o plano: ${studyPlan.getTitle()}`,
                        AchievementType.PLAN_COMPLETED,
                        userId
                    )
                );

                await this.certificateRepository.create(
                    Certificate.create(
                        `Certificado de Conclusão - ${studyPlan.getTitle()}`,
                        userId,
                        studyPlan.getStudyPlanId()!
                    )
                );
            }
        }

        const user = await this.userRepository.findById(userId);
        if (user) {
            user.incrementStreak();
            await this.userRepository.update(user);
        }

        return task;
    }
}