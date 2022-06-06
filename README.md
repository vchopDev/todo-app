# todo-app
    Hyve Mobile Todo App Challenge

## Task: 
    - Create a dockerized RESTful NodeJS application that manages a database of users and a todo list for each user.

## Specifics:
    - Use TypeScript.
    - Your application should use a RESTful API to manage CRUD.
    - Your application should be built inside a docker container.
    - Persist the data to a MySQL DB.
    - Any NodeJS framework can be used if you so wish. ie Nest.JS
    - Once completed, upload the source code in a git repo to a publicly accessible repository
    manager.


## Requirements to run the projects
    - Mysql Server version 8+
    - NodeJs version 16+

## Docker commands:
```sh
    docker-compose --env-file .\.env.dev build
    docker-compose --env-file .\.env.dev up
```