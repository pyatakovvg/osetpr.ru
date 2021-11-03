#!/bin/sh

docker-compose --file ./_deploy/compose.prod.yml up --build -d

# shellcheck disable=SC2046
docker rmi $(docker images -f dangling=true -q) --force