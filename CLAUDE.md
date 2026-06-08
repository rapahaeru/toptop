# Toptop — Guia para o Claude

## Objetivo do projeto

Sistema pessoal de banco de dados de animes, começando pelo Saint Seiya.
Foco atual: catalogar e consultar episódios via API REST.
O usuário está aprendendo backend e DevOps — priorize clareza e estrutura explícita.

## Stack

- **Runtime:** Node.js com NestJS (TypeScript)
- **Banco:** MySQL rodando via Docker
- **ORM:** TypeORM apenas como conector — `synchronize: false` sempre
- **Schema:** gerenciado exclusivamente via SQL em `mysql/init/` (docker-entrypoint-initdb.d)
- **Ambiente local:** Windows + Docker Desktop

## Acordos de arquitetura

### Entidades
- Todas as entidades (exceto `user`) estendem `BaseAuditableEntity` de `src/entities/base/base-auditable.entity.ts`
- `BaseAuditableEntity` fornece: `id`, `createdTime`, `createdBy`, `updatedTime`, `updatedBy`
- `created_by` e `updated_by` são sempre relações `ManyToOne` com a entidade `User`
- PKs são sempre simples (`id INT AUTO_INCREMENT`) — nunca PKs compostas

### Módulos
- Cada entidade tem seu próprio módulo em `src/{nome-plural}/`
- Estrutura padrão por módulo: `module.ts`, `service.ts`, `controller.ts`, `dto/create-xxx.dto.ts`
- Módulos exportam o service (`exports: [XxxService]`) para reuso futuro

### Autenticação
- JWT implementado em `src/auth/` (AuthModule, AuthService, JwtStrategy, JwtRefreshStrategy)
- Endpoints: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`
- Access token: 15 min (`JWT_ACCESS_SECRET`); Refresh token: 7 dias (`JWT_REFRESH_SECRET`) com rotação
- Todos os endpoints `POST` de criação de entidades exigem `JwtAuthGuard` + `@CurrentUser('sub')`
- `userId` vem do token JWT — o `userId = 1` hardcoded foi removido de todos os controllers
- Refresh token é armazenado como bcrypt hash na coluna `refresh_token` da tabela `user`
- `password` e `refreshToken` são excluídos das respostas via `@Exclude()` + `ClassSerializerInterceptor` global

### Banco de dados
- Schema e seeds ficam em `mysql/init/` com prefixo numérico (`001_schema.sql`, `002_seed_user.sql`, ...)
- `dump_schema.sql` é mantido em sincronia com `001_schema.sql`
- Para recriar o banco: `npm run stop:compose && npm run start:compose`

## Entidades existentes

| Entidade | Tabela | Módulo | Status |
|---|---|---|---|
| `User` | `user` | `users` | pronto |
| `Director` | `director` | `directors` | pronto |
| `Genre` | `genre` | `genres` | pronto |
| `ProductionStudio` | `production_studio` | `production-studios` | pronto |
| `Producer` | `producer` | `producers` | pronto |
| `Broadcaster` | `broadcaster` | `broadcasters` | pronto |
| `AnimationDirector` | `animation_director` | `animation-directors` | pronto |
| `Script` | `script` | `scripts` | pronto |
| `Storyboard` | `storyboard` | `storyboards` | pronto |
| `Series` | `series` | `series` | pronto |
| `Episode` | `episode` | `episodes` | pronto |

## O que NÃO fazer

- Não alterar arquivos de configuração (`tsconfig.json`, `.eslintrc`, etc.)
- Não alterar testes existentes sem permissão explícita
- Não usar `synchronize: true` no TypeORM
- Não criar migrations do TypeORM — schema é controlado pelo SQL manual
- Não adicionar comentários explicando o que o código faz — só o porquê quando não for óbvio
