export const COMMON_ERROR_MESSAGES = {
    INVALID_ID: "ID inválido.",
    INVALID_TITLE: {
        EMPTY: "Título não pode ser vazio.",
        MAX_LENGTH: "Título não pode ter mais de 50 caracteres.",
    },
    INVALID_DESCRIPTION: {
        EMPTY: "Descrição não pode ser vazia.",
        MAX_LENGTH: "Descrição não pode ter mais de 500 caracteres.",
    },
    MISSING_REQUIRED_FIELDS: "Campos obrigatórios vazios ou não fornecidos.",
} as const;

export const COMMON_ERROR_CODES = {
    INVALID_ID: "INVALID_ID",
    INVALID_TITLE: "INVALID_TITLE",
    INVALID_DESCRIPTION: "INVALID_DESCRIPTION",
    MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
} as const;