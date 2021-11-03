#!/bin/sh

docker-compose up --build -d --file compose.prod.yml

# shellcheck disable=SC2046
docker rmi $(docker images -f dangling=true -q) --force