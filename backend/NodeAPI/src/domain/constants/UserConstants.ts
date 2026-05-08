export const USER_ERROR_MESSAGES = {
  INVALID_ID: "ID inválido.",
  INVALID_EMAIL: "E-mail inválido.",
  INVALID_BIRTH_DATE: "Data de nascimento inválida.",
  INVALID_PASSWORD: {
    MIN_LENGTH: "Senha deve ter no mínimo 8 caracteres.",
    UPPERCASE: "Senha deve conter ao menos uma letra maiúscula.",
    NUMBER: "Senha deve conter ao menos um número.",
    SPECIAL_CHAR: "Senha deve conter ao menos um caractere especial.",
  },
  USER_NOT_FOUND: "Usuário não encontrado!",
  INVALID_CREDENTIALS: "E-mail ou senha inválidos.",
  INVALID_OLD_PASSWORD: "Senha atual incorreta.",
} as const;

export const USER_ERROR_CODES = {
  INVALID_ID: "INVALID_ID",
  INVALID_NAME: "INVALID_NAME",
  INVALID_EMAIL: "INVALID_EMAIL",
  INVALID_BIRTH_DATE: "INVALID_BIRTH_DATE",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_OLD_PASSWORD: "INVALID_OLD_PASSWORD",
} as const;

export const USER_LABELS = {
  TO_STRING: (id: number | undefined, name: string, email: string) =>
    `User[id=${id}, nome=${name}, email=${email}]`,
} as const;