import { StudyPlan } from '../../domain/entities/StudyPlan'
import { Module } from '../../domain/entities/Module'

export function mapStudyPlan(data: any): StudyPlan {
    return {
        id: data.studyPlanId ?? data.id,
        title: data.title,
        language: data.language,
        level: data.level,
        progress: data.progress ?? 0,
        modules: data.modules?.map(mapModule)
    }
}

export function mapModule(data: any): Module {
    return {
        id: data.moduleId ?? data.id,
        title: data.moduleTitle ?? data.title,
        isLocked: data.isLocked ?? false,
        isCompleted: data.isCompleted ?? false,
        order: data.order ?? 0,
        progress: data.progress ?? 0
    }
}