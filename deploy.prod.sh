#!/bin/sh

docker-compose up --file compose.prod.yml --build -d

# shellcheck disable=SC2046
docker rmi $(docker images -f dangling=true -q) --force