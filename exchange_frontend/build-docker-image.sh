#!/bin/sh

if [ -e Dockerfile ]
then
  rm Dockerfile
fi

cp .env .env.orig
cp .env.prod .env.production

cp docker/Dockerfile ./Dockerfile

rm -rf dist

npm run build

docker image rm --force bitcoinalley/exchange_frontend

docker build --rm --tag=bitcoinalley/exchange_frontend .

docker push bitcoinalley/exchange_frontend

if [ -e Dockerfile ]
then
  rm Dockerfile
fi

if [ -e .env.orig ]
then
  cp .env.orig .env
  rm .env.orig
fi

if [ -e .env.production ]
then
  rm .env.production
fi
