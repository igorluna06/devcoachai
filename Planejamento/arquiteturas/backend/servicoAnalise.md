## 🔵 Estrutura do Serviço de Análise (Java - Spring Boot)

```bash
src/
├── domain/
│   └── rules/                 # regras de análise (lógica pura)
│
├── application/
│   ├── use-cases/             # casos de uso (ex: AnalyzeProgress)
│   └── dtos/                  # AnalysisRequest / AnalysisResponse
│
├── infrastructure/
│   └── config/                # configs do Spring (se necessário)
│
├── presentation/
│   └── controllers/           # endpoints REST (AnalysisController)
│
└── main/
    └── DevCoachAiApplication  # classe principal (Spring Boot)
```

---

## 🎯 Organização das Responsabilidades

### 🟣 Domain

* Contém as regras de análise
* Não depende de Spring ou banco

Exemplo:

* identificar dificuldade em módulos
* sugerir próximos passos

---

### 🔵 Application

* Orquestra a lógica da análise
* Recebe dados do Node e processa

Exemplo:

* AnalyzeProgressUseCase

---

### 🟡 Infrastructure

* Configurações do projeto
* Integrações externas (se houver)

---

### 🟢 Presentation

* Recebe requisições HTTP do Node
* Retorna respostas da análise

---

### ⚫ Main

* Inicializa a aplicação Spring Boot

---

## 🔗 Fluxo de Análise

```text
Node API → Java Controller → UseCase → Rules (Domain) → Response
```

---

## 📦 Exemplo de Entrada (Request)

```json
{
  "completedTasks": 10,
  "failedModules": ["loops"],
  "language": "JAVA"
}
```

---

## 📦 Exemplo de Saída (Response)

```json
{
  "suggestion": "Revise loops antes de avançar",
  "nextStep": "Estruturas de repetição"
}
```
