## Description

NestJS, Typescript and Postgres.

Design a simple CRUD API that allow to manage customers and claims attached to them.

To create a customer, you must provide an email and a name.

When we get a customer, we want an email, a name and the sum of all the claims point value attached to the customer.

Claims should be attached to a customer. They contain a title, a description and point value.

We should have the possibility to batch create claims.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# start DB
$ yarn start:dev:db
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

To complete:

The docker-compose setup is almost complete, but the database is still crashing
Unique test
Authentication mechanism
