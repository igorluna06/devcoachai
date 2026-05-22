export const ACHIEVEMENT_ERROR_MESSAGES = {
    INVALID_ACHIEVEMENT_TYPE: "Tipo de conquista inválido.",
    ACHIEVEMENT_NOT_FOUND: "Conquista não encontrada.",
} as const;

export const ACHIEVEMENT_ERROR_CODES = {
    INVALID_ACHIEVEMENT_TYPE: "INVALID_ACHIEVEMENT_TYPE",
    ACHIEVEMENT_NOT_FOUND: "ACHIEVEMENT_NOT_FOUND",
} as const;

export const ACHIEVEMENT_MESSAGES = {
    MODULE_COMPLETED_TITLE: "Módulo Concluído",
    MODULE_COMPLETED_DESCRIPTION: (moduleTitle: string) => `Você concluiu o módulo: ${moduleTitle}`,
    PLAN_COMPLETED_TITLE: "Plano Concluído",
    PLAN_COMPLETED_DESCRIPTION: (planTitle: string) => `Você concluiu o plano: ${planTitle}`,
    CERTIFICATE_TITLE: (planTitle: string) => `Certificado de Conclusão - ${planTitle}`,
} as const;