# toptop

Banco de dados pessoal de animes — API REST construída com NestJS + MySQL.

**Produção:** `https://toptop.api.br`

---

## Pré-requisitos

- Node.js 20+
- Docker Desktop
- Git

---

## Configuração local (primeira vez)

**1. Instalar dependências**

```bash
npm install
```

**2. Criar o arquivo de variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o `.env` com seus valores:

```env
NODE_ENV=development
API_PORT=3000

DB_HOST=127.0.0.1
DB_NAME=toptop
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_ROOT_PASSWORD=sua_senha_root
DB_PORT=3306

TZ=America/Sao_Paulo
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci

ALLOWED_ORIGINS=http://localhost:3000

JWT_ACCESS_SECRET=segredo-longo-aleatorio
JWT_REFRESH_SECRET=outro-segredo-longo-aleatorio
```

Para gerar os secrets JWT:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**3. Subir o banco de dados**

```bash
npm run start:compose
```

O MySQL sobe com o schema e seeds aplicados automaticamente a partir de `mysql/init/`.

**4. Iniciar a API**

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

---

## Workflow: fazendo uma alteração

### Alteração de código (controller, service, dto, etc.)

```bash
# 1. Desenvolva e teste localmente
npm run start:dev

# 2. Rode os testes
npm test

# 3. Commit e push
git add <arquivos>
git commit -m "tipo: descrição"
git push origin main
```

### Alteração no banco de dados (schema ou seeds)

O schema é gerenciado **exclusivamente** por arquivos SQL em `mysql/init/`. Nunca use migrations do TypeORM.

```bash
# 1. Crie ou edite o arquivo SQL em mysql/init/ (ex: 004_nova_tabela.sql)

# 2. Recriar o banco local para testar
npm run stop:compose   # derruba containers e volumes
npm run start:compose  # sobe novamente aplicando todos os scripts

# 3. Commit e push
git add mysql/init/
git commit -m "db: descrição da alteração"
git push origin main
```

---

## Deploy na VPS

### Atualizar após push

```bash
# 1. Conectar na VPS via SSH
ssh root@187.77.50.168

# 2. Entrar no diretório do projeto
cd ~/toptop

# 3. Puxar as alterações
git pull origin main

# 4. Rebuild e restart dos containers
docker compose -f docker-compose.prod.yml up -d --build
```

### Se alterou o banco de dados

O MySQL em produção **não recria o volume automaticamente**. Para aplicar alterações de schema:

```bash
# ATENÇÃO: isso apaga todos os dados do banco em produção
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml up -d --build
```

Se quiser preservar os dados, aplique o SQL manualmente:

```bash
docker exec -it toptop-mysql mysql -u root -p toptop < mysql/init/004_nova_tabela.sql
```

---

## Comandos úteis

### Local

| Comando | Descrição |
|---|---|
| `npm run start:dev` | Inicia a API em modo watch |
| `npm run start:compose` | Sobe o MySQL via Docker |
| `npm run stop:compose` | Derruba o MySQL e apaga volumes |
| `npm run restart:compose` | Recria o banco do zero |
| `npm test` | Roda os testes |
| `npm run test:cov` | Cobertura de testes |

### VPS

```bash
# Ver logs da aplicação
docker compose -f docker-compose.prod.yml logs -f app

# Ver logs do nginx
docker compose -f docker-compose.prod.yml logs -f nginx

# Status dos containers
docker compose -f docker-compose.prod.yml ps

# Acessar o banco em produção
docker exec -it toptop-mysql mysql -u root -p

# Reiniciar apenas a app (sem rebuild)
docker compose -f docker-compose.prod.yml restart app
```

---

## SSL (Let's Encrypt)

O certificado é gerenciado pelo certbot e expira em 90 dias. Para renovar manualmente:

```bash
docker compose -f docker-compose.prod.yml run --rm --entrypoint certbot certbot renew
docker compose -f docker-compose.prod.yml restart nginx
```

O serviço `certbot` no `docker-compose.prod.yml` tenta renovar automaticamente a cada 12h enquanto estiver rodando.

---

## Autenticação

Todos os endpoints de criação exigem JWT. Fluxo:

```
POST /auth/register   → cria usuário
POST /auth/login      → retorna accessToken (15min) e refreshToken (7 dias)
POST /auth/refresh    → renova o accessToken usando o refreshToken
POST /auth/logout     → invalida o refreshToken
```

Endpoints de criação com role `admin`:

```
Authorization: Bearer <accessToken>
```

Para promover um usuário a admin no banco:

```sql
UPDATE user SET role = 'admin' WHERE username = 'seu_usuario';
```
