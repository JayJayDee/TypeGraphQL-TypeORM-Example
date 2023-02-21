import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { initOrmEntities } from './orm-entities';
import { initConfiguration, HttpConfigToken } from './configurations';
import { initLogger, LoggerToken } from './loggers';
import { initDatabaseConnection } from './orm-initiator';
import { pourInitialData } from './initial-data-pourer';
import { AllResolvers } from './graphql-resolvers';

(async () => {
  await initConfiguration();
  const http = Container.get(HttpConfigToken);

  await initLogger();
  const log = Container.get(LoggerToken);

  await initOrmEntities();
  await initDatabaseConnection();

  await pourInitialData();

  const schema = await buildSchema({
    // @ts-ignore
    resolvers: AllResolvers(),
    nullableByDefault: true
  });

  const server = new ApolloServer({
    schema,
    introspection: true
  });

  const { url } = await server.listen(http.port);
  log.info(`GraphQL Server Started: ${url}`);
})();