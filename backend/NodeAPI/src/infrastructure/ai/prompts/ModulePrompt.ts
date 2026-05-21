export const MODULE_PROMPTS = {
    GENERATE_MODULES: (
        language: string,
        level: string,
        planTitle: string,
        planDescription: string
    ) => `
Você é um especialista em ensino de programação. Gere uma lista de módulos para um plano de estudos em JSON.

Dados do plano:
- Linguagem: ${language}
- Nível: ${level}
- Título do plano: ${planTitle}
- Descrição: ${planDescription}

Retorne APENAS um JSON válido, sem texto adicional, sem markdown, sem blocos de código, com esta estrutura exata:
{
  "modules": [
    {
      "title": "título do módulo",
      "description": "descrição do módulo",
      "estimatedHours": 5
    }
  ]
}

Crie entre 4 e 6 módulos em ordem lógica de aprendizado. Foque em progressão gradual do básico ao avançado.
    `.trim()
} as const;