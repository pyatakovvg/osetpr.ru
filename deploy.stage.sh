#!/bin/sh

docker-compose --file compose.stage.yml up --build -d

# shellcheck disable=SC2046
docker rmi $(docker images -f dangling=true -q) --force