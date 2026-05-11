export const STUDY_PLAN_ERROR_MESSAGES = {
    INVALID_TITLE: {
        EMPTY: "Título não pode ser vazio.",
        MAX_LENGTH: "Título não pode ter mais de 50 caracteres.",
    },
    INVALID_LANGUAGE: "Linguagem inválida.",
} as const;

export const STUDY_PLAN_ERROR_CODES = {
    INVALID_TITLE: "INVALID_TITLE",
    INVALID_LANGUAGE: "INVALID_LANGUAGE",
} as const;