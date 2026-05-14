# 🚀 DevCoachAI

Plataforma inteligente de acompanhamento de estudos em programação. O DevCoachAI cria planos de estudo personalizados, monitora o progresso do usuário e fornece sugestões inteligentes de evolução com base no desempenho real.

---

## 💡 Problema que resolve

Iniciantes em programação enfrentam três grandes barreiras:
- **Não sabem o que estudar** — a quantidade de conteúdo é enorme e sem direção
- **Falta de prática** — a maioria dos cursos é teórica e não prepara para o mercado
- **Inconsistência** — sem acompanhamento, é fácil desistir

O DevCoachAI resolve isso com planos personalizados, foco em prática e acompanhamento inteligente.

---

## 🎯 Funcionalidades

### 👤 Usuário
- Cadastro e autenticação com JWT
- Onboarding inteligente — identifica o melhor caminho de estudos com base no objetivo, região e experiência do usuário

### 📚 Plano de Estudo
- Gerado automaticamente no cadastro com base no perfil do usuário
- Suporte a múltiplos planos por usuário
- Níveis: Iniciante, Intermediário e Avançado
- Campos: linguagem, descrição, prazo estimado

### 📦 Módulos
- Organizados por ordem dentro do plano
- Marcação de conclusão automática com base nas tarefas
- Tempo estimado por módulo

### ✅ Tarefas
- Tipos: Teoria, Prática e Projeto
- Avaliação de dificuldade pelo usuário (Fácil, Médio, Difícil)
- Tempo estimado por tarefa
- Marcação de conclusão

### 🔥 Engajamento
- Streak de dias seguidos estudando
- Conquistas baseadas em progresso real
- Certificados ao concluir planos (compartilháveis no LinkedIn)
- Histórico de sessões de estudo

### 🤖 Inteligência (em desenvolvimento)
- Análise de progresso e dificuldades do usuário
- Sugestões personalizadas: *"Você está com dificuldade em loops"*, *"Pode avançar para APIs"*
- Recomendação de linguagem baseada em objetivo, mercado e região

---

## 🧱 Arquitetura

O projeto segue **Clean Architecture** com separação clara de responsabilidades.

src/
├── application/        # Casos de uso e DTOs
├── domain/             # Entidades, repositórios, erros e constantes
├── infrastructure/     # Banco de dados, Prisma, mappers
├── interfaces/         # Controllers, rotas e middlewares
└── main/               # Configuração do servidor

---

## ⚙️ Stack

### 🟢 Backend 1 — API Gateway (este repositório)
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL

Responsável por autenticação, CRUD e comunicação com o frontend.

### 🔵 Backend 2 — Serviço Inteligente (em desenvolvimento)
- Java + Spring Boot
- JPA (Hibernate)

Responsável pelas regras de negócio e análise de progresso do usuário.

### 🎨 Frontend (em desenvolvimento)
- React

### 🔗 Comunicação
- Frontend → Node.js (HTTP REST)
- Node.js → Java (HTTP REST)

---

## 🗄️ Modelo de Dados

| Entidade | Descrição |
|---|---|
| `User` | Dados do usuário, streak e histórico |
| `UserOnboarding` | Respostas do onboarding e recomendações da IA |
| `StudyPlan` | Plano de estudo com linguagem, nível e prazo |
| `Module` | Módulos organizados dentro do plano |
| `Task` | Tarefas práticas, teóricas ou de projeto |
| `StudySession` | Histórico de sessões de estudo |
| `Achievement` | Conquistas desbloqueadas pelo usuário |
| `Certificate` | Certificados gerados ao concluir planos |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/igorluna06/devcoachai.git
cd devcoachai/backend/NodeAPI

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do banco

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
```

---

## 📌 Status do Projeto

🚧 Em desenvolvimento ativo

- [x] Autenticação JWT
- [x] CRUD de Usuários
- [x] CRUD de Planos de Estudo
- [x] CRUD de Módulos
- [ ] CRUD de Tarefas
- [ ] Streak e Sessões de Estudo
- [ ] Conquistas e Certificados
- [ ] Onboarding inteligente
- [ ] Integração com IA
- [ ] Serviço Java
- [ ] Frontend

---

## 👨‍💻 Autor

Feito por **Igor Luna**
