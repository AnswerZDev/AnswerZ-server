#!/bin/bash

cd ~/AnswerZ-server
git pull origin main

cp .github/workflows/scripts/Dockerfile ~/AnswerZ-server

docker-compose up --build -d app
