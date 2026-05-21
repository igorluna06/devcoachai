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
    Você é um especialista em ensino de programação.

    Crie um plano de estudos personalizado em JSON.

    Dados do usuário:
    - Objetivo: ${goal}
    - Preferência: ${preference}
    - Região: ${region}
    - Nível de experiência: ${experienceLevel}
    - Linguagem recomendada: ${recommendedLanguage}
    - Stack recomendada: ${recommendedStack}
    - Nível do plano: ${level}

    Retorne APENAS um JSON válido.

    Não escreva explicações.
    Não use markdown.
    Não use blocos de código.
    Não use \`\`\`json.
    O JSON deve funcionar com JSON.parse().

    Todos os números devem ser inteiros.

    O campo "type" deve conter apenas:
    - THEORY
    - PRACTICE
    - PROJECT

    Estrutura obrigatória:

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
              "type": "THEORY",
              "estimatedMinutes": 30
            }
          ]
        }
      ]
    }

    Crie entre 4 e 6 módulos.
    Cada módulo deve ter entre 3 e 5 tasks.

    Foque em prática e projetos reais.
    `.trim()
} as const;