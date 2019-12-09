#!/bin/sh

if [ -e Dockerfile ]
then
  rm Dockerfile
fi

cp docker/Dockerfile ./Dockerfile
cp .env.prod .env.production

rm -rf dist

npm run build

docker image rm --force bitcoinalley/kyc_frontend

docker build --rm --tag=bitcoinalley/kyc_frontend .

docker push bitcoinalley/kyc_frontend

if [ -e Dockerfile ]
then
  rm Dockerfile
fi

if [ -e .env.production ]
then
  rm .env.production
fi
