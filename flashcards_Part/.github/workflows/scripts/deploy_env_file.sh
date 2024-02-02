#!/bin/bash

ENV_FILE=~/AnswerZ-server/.env

# Vérifier si le fichier .env existe déjà
if [ -e "$ENV_FILE" ]; then
    echo "Le fichier .env existe déjà. Abandon de la création."
else
    touch "$ENV_FILE"

    echo "DATABASE_CONTAINER_NAME=$1
DATABASE_TYPE=$2
DATABASE_HOST=$3
DATABASE_PORT=$4
DATABASE_USER=$5
DATABASE_PASSWORD=$6
DATABASE_NAME=$7
DATABASE_RETRY_ATTEMPTS=$8" > "$ENV_FILE"
fi
