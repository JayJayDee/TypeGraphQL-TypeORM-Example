# TypeGraphQL-TypeORM-Example
An example GraphQL server application which written with [TypeGraphQL](https://typegraphql.ml) + [TypeORM](https://typeorm.io).

## Features
- High code readability.
- Test codes.
- Lazy initialization.
- Using [TypeDI](https://github.com/typestack/typedi) as a container & dependency injector.

## DB E-R Diagram
the DB relation diagram is same as follows. you can also check this out in `src/orm-entities/` directory. implemented with [TypeORM](https://typeorm.io) entities.



![DB E-R Diagram](https://raw.githubusercontent.com/JayJayDee/TypeGraphQL-TypeORM-Example/master/assets/erd.png)

## How to configure application
this application uses [dotenv](https://www.npmjs.com/package/dotenv) as a configuration loader. you can place `.env.dev` dotenv file in project root directory to configure run this application.
```bash
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=my-pokemon-rocks
MYSQL_DATABASE=pokemon
HTTP_PORT=4000
```

## How to run
```bash
$ npm install
$ npm run dev
```

## How to run unit test with Mocha + Chai
```bash
$ npm run test
```

## Next step
- nested GraphQL schema example. -> done.
- nested (releation between tables) entities example -> done
- GraphQL mutations with permission.