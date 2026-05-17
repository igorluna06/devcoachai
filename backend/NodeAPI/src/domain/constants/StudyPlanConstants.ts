export const STUDY_PLAN_ERROR_MESSAGES = {
    INVALID_LANGUAGE: "Linguagem inválida.",
    STUDY_PLAN_ALREADY_EXISTS: "Você já possui um plano de estudos para essa linguagem.",
    STUDY_PLAN_NOT_FOUND: "Plano de estudos não encontrado.",
    INVALID_ESTIMATED_DAYS: "Estimated days must be greater than 0.",
    INVALID_LEVEL: "Nível inválido.",
} as const;

export const STUDY_PLAN_ERROR_CODES = {
    INVALID_LANGUAGE: "INVALID_LANGUAGE",
    STUDY_PLAN_ALREADY_EXISTS: "STUDY_PLAN_ALREADY_EXISTS",
    STUDY_PLAN_NOT_FOUND: "STUDY_PLAN_NOT_FOUND",
    INVALID_LEVEL: "INVALID_LEVEL",
    INVALID_ESTIMATED_DAYS: "INVALID_ESTIMATED_DAYS",
} as const;