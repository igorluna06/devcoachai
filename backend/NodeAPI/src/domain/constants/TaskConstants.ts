export const TASK_ERROR_MESSAGES = {
    INVALID_TITLE: "Título do certificado inválido.",
    INVALID_DESCRIPTION: {
        EMPTY: "Descrição não pode ser vazia.",
        MAX_LENGTH: "Descrição não pode ter mais de 500 caracteres.",
    },
    INVALID_TASK_TYPE: "Tipo de tarefa inválido.",
    INVALID_ESTIMATED_MINUTES: "O tempo estimado deve ser maior que zero.",
    TASK_NOT_FOUND: "Tarefa não encontrada.",
    INVALID_DIFFICULTY_RATING: "Avaliação de dificuldade inválida.",
} as const;

export const TASK_ERROR_CODES = {
    INVALID_TITLE: "INVALID_TASK_TITLE",
    INVALID_DESCRIPTION: "INVALID_TASK_DESCRIPTION",
    INVALID_TASK_TYPE: "INVALID_TASK_TYPE",
    INVALID_ESTIMATED_MINUTES: "INVALID_ESTIMATED_MINUTES",
    TASK_NOT_FOUND: "TASK_NOT_FOUND",
    INVALID_DIFFICULTY_RATING: "INVALID_DIFFICULTY_RATING",
} as const;