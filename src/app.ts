import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Container } from 'typedi';

import { AllResolvers } from './graphql-resolvers';
import { AllModels } from './graphql-models';
import { initConfiguration, MysqlConfigToken, HttpConfigToken } from './configurations';

(async () => {
  await initConfiguration();

  const mysql = Container.get(MysqlConfigToken);
  const http = Container.get(HttpConfigToken);

  await createConnection({
    name: 'default',
    type: 'mysql',
    host: mysql.host,
    port: mysql.port,
    username: mysql.user,
    password: mysql.password,
    database: mysql.database,
    entities: AllModels,
    synchronize: true
  });

  const schema = await buildSchema({
    resolvers: AllResolvers,
    nullableByDefault: true
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(http.port);
  console.log(`server started: ${url}`);
})();