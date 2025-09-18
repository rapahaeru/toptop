# toptop

A series data base

### Instalando mysql no docker

para levantar o banco `docker-compose up -d`
para visualizar saúde do banco: `docker inspect --format='{{json .State.Health}}' toptop-mysql`
Conecte-se via workbench ou aplicação de preferencia.

Via CLI

```
docker exec -it toptop-mysql mysql -u athenayo -p
# digite a senha e depois:
USE saint_seiya;
SHOW TABLES;

```

para parar e subir novamente:

```
docker compose down
# ou
docker compose down -v        # (opcional) zera o volume para ver os scripts rodarem na 1ª vez
docker compose up -d

```
