export const TASK_PROMPTS = {
    GENERATE_TASKS: (
        planTitle: string,
        language: string,
        level: string,
        moduleTitle: string,
        moduleDescription: string
    ) => `
Você é um especialista em ensino de programação. Gere tasks para um módulo de estudos em JSON.

Plano: ${planTitle}
Linguagem: ${language}
Nível: ${level}
Módulo: ${moduleTitle}
Descrição do módulo: ${moduleDescription}

Retorne APENAS um JSON válido, sem texto adicional, sem markdown, sem blocos de código, com esta estrutura exata:
{
  "tasks": [
    {
      "title": "título da task",
      "description": "descrição da task",
      "type": "THEORY" ou "PRACTICE" ou "PROJECT",
      "estimatedMinutes": 30
    }
  ]
}

Crie entre 7 e 10 tasks relevantes ao conteúdo do módulo, sendo:
- 2 a 3 tasks de THEORY (conceitos fundamentais)
- 3 a 4 tasks de PRACTICE (exercícios práticos)
- 1 a 2 tasks de PROJECT (projeto real aplicando o conteúdo)

Foque em progressão gradual dentro do módulo.
    `.trim()
} as const;