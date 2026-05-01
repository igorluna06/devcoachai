# 🚀 Nome

DevCoachAI

# 💡 Ideia 

Plataforma de acompanhamento de estudos em programação que:

cria planos de estudo personalizados
monitora o progresso do usuário
fornece sugestões inteligentes de evolução

# 🎯 Objetivo do sistema

## Ajudar iniciantes a:

* Manter consistência
* Saber o que estudar
* Evoluir com direção

# 📌 Funcionalidades 

## 🔹 1. Usuário
* Cadastro
* Login (JWT)
* Seleção de linguagem principal

## 🔹 2. Plano de estudo
* Gerado automaticamente ao criar conta
* Baseado na linguagem escolhida
* Contém:
    * módulos (ex: lógica, loops, APIs)
    * tarefas

## 🔹 3. Monitoramento
* Marcar tarefa como concluída
* Histórico de estudo
* Streak (dias seguidos estudando)

## 🔹 4. Inteligência (Java API)
* Analisa progresso do usuário
* Retorna sugestões como:
    * “Você está com dificuldade em loops”
    * “Pode avançar para APIs”


# ⚙️ 🧱 Stack 

## 🟢 Backend 1 (API Gateway)
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL

### 👉 Responsável por:

* Autenticação
* CRUD
* Comunicação com frontend

## 🔵 Backend 2 (Serviço inteligente)
* Java + Spring Boot
* JPA (Hibernate)

### 👉 Responsável por:

* regras de negócio
* análise de progresso

## 🎨 Frontend

*React (gerado com IA + ajustes manuais)

## 🔗 Comunicação
* Front → Node (HTTP)
* Node → Java (HTTP REST)