export const JAVA_API_CONSTANTS = {
    BASE_URL: process.env.JAVA_API_URL ?? "http://localhost:8080",
    ENDPOINTS: {
        ANALYZE: (studyPlanId: number) => `/progress/analyze/${studyPlanId}`,
        SUGGESTIONS: (studyPlanId: number) => `/progress/suggestions/${studyPlanId}`,
    }
} as const;

export const JAVA_API_ERROR_MESSAGES = {
    JAVA_API_ERROR: "Erro ao comunicar com o serviço de análise."
} as const;

export const JAVA_API_CODES = {
    JAVA_API_ERROR: "JAVA_API_ERROR"
} as const;
