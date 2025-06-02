# 🎓 EduFinance - Sistema de Simulação de Financiamento Estudantil

Uma plataforma que conecta estudantes de medicina a financiamentos estudantis personalizados, permitindo cadastro, autenticação e simulação de financiamentos por meio de um dashboard interativo e moderno.

---

## 📋 Sobre o Projeto

O EduFinance é composto por duas partes principais:

* **Backend**: API RESTful com autenticação JWT desenvolvida em NestJS.
* **Frontend**: Dashboard interativo desenvolvido em React com TypeScript.

---

## 🚀 Tecnologias Utilizadas

### Backend

* **NestJS** com **Fastify**
* **TypeScript**
* **Prisma** (ORM)
* **PostgreSQL** (Banco de dados)
* **JWT** (Autenticação com expiração de 5 minutos)
* **Jest** (Testes unitários e de integração)

### Frontend

* **React** com **TypeScript**
* **Vite** com **SWC**
* **Styled-components** (Estilização)
* **React Hook Form** (Formulários)
* **Zod** (Validação)
* **Context API** (Gerenciamento de estado)
* **React Router** (Roteamento)
* **Framer Motion** (Animações)

---

## 🐳 Execução com Docker

### Pré-requisitos

* Docker
* Docker Compose

### Como executar o projeto completo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/edufinance.git
cd edufinance

# Execute com Docker Compose (na raiz do projeto)
docker-compose up -d

# O frontend estará disponível em: http://localhost:8080
# O backend estará disponível em: http://localhost:3000
```

> ⚠️ **Nota:** Não é necessário criar arquivos `.env` manualmente para rodar via Docker. As variáveis de ambiente essenciais já estão definidas diretamente no `docker-compose.yml`.

---

## 🔧 Execução Local (Desenvolvimento)

### Backend

```bash
cd backend

# Instalar dependências
npm ci

# Configurar banco de dados
docker-compose up -d postgres

# Executar migrações
npx prisma migrate dev

# Iniciar em modo desenvolvimento
npm run start:dev

# Executar testes
npm run test
npm run test:e2e
```

> Para executar os testes de integração (e2e) localmente, é necessário que um banco PostgreSQL esteja rodando com as credenciais corretas.

### Frontend

```bash
cd frontend

# Instalar dependências
npm ci

# Iniciar em modo desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## 📊 Funcionalidades Implementadas

### ✅ Autenticação

* [x] Login e cadastro de estudantes
* [x] Proteção de rotas
* [x] JWT com expiração de 5 minutos
* [x] Logout
* [x] Interceptor para tratamento de tokens

### ✅ Simulações

* [x] Criação de novas simulações
* [x] Cálculo automático da parcela mensal (fórmula Price)
* [x] Histórico com paginação
* [x] Edição e exclusão de simulações

### ✅ Perfil do Estudante

* [x] Visualização dos dados cadastrais
* [x] Edição de dados pessoais
* [x] Validação de formulários

### ✅ Componentes Reutilizáveis

* [x] Navbar responsiva
* [x] Botões com variantes
* [x] Dropdown/Modal
* [x] Paginação
* [x] Formulários com validação

---

## ⚡️ Funcionalidades Pendentes

### ❌ A Implementar

* [ ] **Filtro das simulações** (frontend)
* [ ] **Resumo das simulações com gráficos** (frontend)
* [ ] **Refresh session automático**
* [ ] **Resumo das simulações recentes**
* [ ] **Cards com totalizadores**
* [ ] **Interface responsiva** (frontend)

---

## 🎯 Regras de Negócio

### Fórmula de Cálculo da Parcela

```
PMT = PV * (i / (1 - (1 + i)^-n))

Onde:
- PMT = parcela mensal
- PV = valor total do financiamento
- i = juros ao mês (ex: 0.02 para 2%)
- n = número de parcelas
```

### Validações

* **Valor total**: Mínimo R\$ 10,00
* **Parcelas**: Mínimo 3, máximo 360
* **Juros**: Mínimo 0,01% ao mês
* **Autenticação**: Token expira em 5 minutos

---

## 🔐 Exemplos de Variáveis de Ambiente

> Esses exemplos são apenas para quem desejar executar o projeto fora do Docker. Para execução com Docker, as variáveis já estão definidas no `docker-compose.yml`.

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/edufinance"
JWT_SECRET="seu-jwt-secret-super-seguro"
JWT_EXPIRES_IN="5m"
PORT=3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

---

<div align="center">⁂</div>
