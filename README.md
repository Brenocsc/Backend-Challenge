# Backend-Challenge
Login and register API

## How to run the project

Run `npm i` to install all the dependencies of the project.

Run `npm run start` to initialize.

## How to run the project in a Docker container

Run `docker build . -t backend-challenge` to build the docker image.

Run `docker run -p 3000:3000 backend-challenge` to create a container with the created image.

## How to run tests

Run `npm run test` to execute all tests.

## How to use with Swagger

After the project is already running, access this link `http://localhost:3000/api-docs`, 
then run the two endpoints.

## How to use with Postman

After the project is already running, import `backend-challenge-api.postman_collection.json`
to Postman, then run the two endpoints.
