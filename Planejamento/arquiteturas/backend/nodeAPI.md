# 🧩 Estrutura da Aplicação (Node.js)
```bash
src
│
├── domain
│   ├── entities
│   └── repositories (interfaces)
│
├── application
│   ├── use-cases
│   └── dtos
│
├── infrastructure
│   ├── database (Prisma)
│   ├── repositories (implementações)
│   └── integrations (Java Service)
│
├── presentation
│   ├── controllers
│   └── middlewares
│
└── main
    ├── routes
    └── server
```

# 🎯 Descrição das Camadas

## 🟣 Domain (Domínio)

Camada central da aplicação.

Responsável por:

- Entidades principais (User, StudyPlan, Task, etc.)
- Interfaces de repositórios

### 📌 Regras:

- Não depende de nenhuma tecnologia externa
- Não conhece banco de dados, frameworks ou APIs

## 🔵 Application (Casos de Uso)

Contém a lógica da aplicação.

Responsável por:

- Casos de uso (CreateUser, LoginUser, CreateStudyPlan)
- Orquestração das regras de negócio

- Exemplo:

    - Criar usuário
    - Gerar plano de estudo
    - Marcar tarefa como concluída

## 🟡 Infrastructure (Infraestrutura)

Implementação de detalhes externos.

Responsável por:

- Prisma (acesso ao banco de dados)
- Implementação dos repositórios
- Integração com o serviço Java

## 🟢 Presentation (Apresentação)

Camada de entrada da aplicação.

Responsável por:

- Controllers (Express)
- Middlewares (ex: autenticação JWT)
- Validação de dados