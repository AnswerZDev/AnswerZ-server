#! /bin/bash

cd ~/AnswerZ-server

sudo apt install docker-compose


container_name=$1

if docker ps -q --filter "name=${container_name}" 2>/dev/null; then
    docker stop ${container_name}
    docker rm ${container_name}
fi

docker-compose up --build -d postgres_database
