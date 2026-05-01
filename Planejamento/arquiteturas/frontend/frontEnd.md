## 🎨 Estrutura do Frontend (React)

```bash 
src/
├── pages/
│   ├── Login/
│   │   └── index.tsx
│   │
│   ├── Register/
│   │   └── index.tsx
│   │
│   ├── Dashboard/
│   │   └── index.tsx
│   │
│   ├── LanguageSelection/
│   │   └── index.tsx
│   │
│   ├── Profile/
│   │   └── index.tsx
│   │
│   ├── Task/
│   │   └── index.tsx
│
├── components/
│   ├── TaskCard/
│   ├── ProgressBar/
│   ├── SuggestionBox/
│   └── Layout/              # sidebar + header (muito importante)
│
├── services/
│   └── api/
│
├── hooks/
│   ├── useAuth/
│   └── useTasks/
│
├── context/
│   └── AuthContext/
│
├── types/
│
├── utils/
│
├── routes/
│   └── index.tsx
│
└── main/
    ├── App.tsx
    └── main.tsx
```

---

## 🎯 Organização das Responsabilidades

### 📄 Pages

* Representam telas completas
* Ex: Login, Cadastro, Dashboard

---

### 🧩 Components

* Partes reutilizáveis da interface
* Ex: cards, botões, barras de progresso

---

### 🔗 Services

* Comunicação com o backend (Node API)
* Centraliza requisições HTTP

---

### 🪝 Hooks

* Lógica reutilizável
* Ex: autenticação, manipulação de estado

---

### 🌐 Context

* Gerenciamento de estado global
* Ex: usuário logado, token JWT

---

### 🧠 Types

* Tipagem da aplicação (interfaces e tipos)

---

### 🛠️ Utils

* Funções auxiliares
* Ex: formatação, validações simples

---

### 🚏 Routes

* Definição de navegação (React Router)

---

### ⚫ Main

* Ponto de entrada da aplicação

---

## 🔗 Fluxo de Comunicação

```text id="9yq3z3"
Frontend → Node API → (opcional) Java Service → Node → Frontend
```

---

## 🎯 Objetivo do Frontend

* Exibir dados do usuário
* Permitir interação (tarefas, planos)
* Mostrar insights gerados pelo backend (Java)

---

## 🚀 Considerações

* Estrutura pensada para crescimento
* Separação clara entre UI e lógica
* Fácil integração com backend

---
