export const STUDY_PLAN_ERROR_MESSAGES = {
    INVALID_TITLE: "Título do certificado inválido.",
    INVALID_LANGUAGE: "Linguagem inválida.",
    STUDY_PLAN_ALREADY_EXISTS: "Você já possui um plano de estudos para essa linguagem.",
    STUDY_PLAN_NOT_FOUND: "Plano de estudos não encontrado.",
    INVALID_DESCRIPTION: {
    EMPTY: "Description cannot be empty",
    MAX_LENGTH: "Description cannot exceed 500 characters"
    },
    INVALID_ESTIMATED_DAYS: "Estimated days must be greater than 0.",
    INVALID_LEVEL: "Nível inválido.",
} as const;

export const STUDY_PLAN_ERROR_CODES = {
    INVALID_TITLE: "INVALID_TITLE",
    INVALID_LANGUAGE: "INVALID_LANGUAGE",
    STUDY_PLAN_ALREADY_EXISTS: "STUDY_PLAN_ALREADY_EXISTS",
    STUDY_PLAN_NOT_FOUND: "STUDY_PLAN_NOT_FOUND",
    INVALID_DESCRIPTION: "INVALID_DESCRIPTION",
    INVALID_LEVEL: "INVALID_LEVEL",
    INVALID_ESTIMATED_DAYS: "INVALID_ESTIMATED_DAYS",
} as const;