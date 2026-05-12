export const STUDY_PLAN_ERROR_MESSAGES = {
    INVALID_TITLE: {
        EMPTY: "Título não pode ser vazio.",
        MAX_LENGTH: "Título não pode ter mais de 50 caracteres.",
    },
    INVALID_LANGUAGE: "Linguagem inválida.",
    STUDY_PLAN_ALREADY_EXISTS: "Você já possui um plano de estudos para essa linguagem.",
    STUDY_PLAN_NOT_FOUND: "Plano de estudos não encontrado.",
} as const;

export const STUDY_PLAN_ERROR_CODES = {
    INVALID_TITLE: "INVALID_TITLE",
    INVALID_LANGUAGE: "INVALID_LANGUAGE",
    STUDY_PLAN_ALREADY_EXISTS: "STUDY_PLAN_ALREADY_EXISTS",
    STUDY_PLAN_NOT_FOUND: "STUDY_PLAN_NOT_FOUND",
} as const;