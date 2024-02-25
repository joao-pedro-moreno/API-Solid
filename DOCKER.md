# Docker

## Create container

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest

[--name api-solid-pg] => Container name

[-e POSTGRESQL_USERNAME=docker] => Database username

[-e POSTGRESQL_PASSWORD=docker] => Database password

[-e POSTGRESQL_DATABASE=apisolid] => Database name

[-p 5432:5432] => Host port to docker port

## Start container

docker start ``container-name``

## Stop container

docker stop ``container-name``

## Delete container

docker rm ``container-name``

## Container LOGS

docker logs ``container-name``

[update logs] => docker logs ``container-name`` -f

## Show containers

docker ps

## Create application containers with docker-compose.yml

docker compose up

## Start application containers with docker-compose.yml

docker compose start

[running on background without logs] docker compose up -d

## Stop application containers

docker compose stop

## Delete application containers

docker compose down
