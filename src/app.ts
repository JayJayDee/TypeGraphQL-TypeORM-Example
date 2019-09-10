import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { AllResolvers } from './graph-resolvers';
import { AllModels } from './graph-models';

(async () => {
  await createConnection({
    name: 'default',
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'hands',
    database: 'typeorm_test',
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

  const { url } = await server.listen(3000);
  console.log(`server started: ${url}`);
})();