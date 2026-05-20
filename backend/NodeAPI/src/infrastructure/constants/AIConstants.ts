export const AI_PROMPTS = {
    GENERATE_STUDY_PLAN: (
        goal: string,
        preference: string,
        region: string,
        experienceLevel: string,
        recommendedLanguage: string,
        recommendedStack: string,
        level: string
    ) => `
Você é um especialista em ensino de programação. Crie um plano de estudos personalizado em JSON.

Dados do usuário:
- Objetivo: ${goal}
- Preferência: ${preference}
- Região: ${region}
- Nível de experiência: ${experienceLevel}
- Linguagem recomendada: ${recommendedLanguage}
- Stack recomendada: ${recommendedStack}
- Nível do plano: ${level}

Retorne APENAS um JSON válido, sem texto adicional, sem markdown, sem blocos de código, com esta estrutura exata:
{
  "title": "título do plano",
  "description": "descrição do plano",
  "estimatedDays": 30,
  "modules": [
    {
      "title": "título do módulo",
      "description": "descrição do módulo",
      "estimatedHours": 5,
      "tasks": [
        {
          "title": "título da task",
          "description": "descrição da task",
          "type": "THEORY" ou "PRACTICE" ou "PROJECT",
          "estimatedMinutes": 30
        }
      ]
    }
  ]
}

Crie entre 4 e 6 módulos com 3 a 5 tasks cada. Foque em prática e projetos reais.
    `.trim()
} as const;

export const AI_ERROR_MESSAGES = {
    PARSE_ERROR: "Erro ao processar resposta da IA.",
} as const;

export const AI_ERROR_CODES = {
    PARSE_ERROR: "AI_PARSE_ERROR",
} as const;