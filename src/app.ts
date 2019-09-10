import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Resolver, Query, Arg, buildSchema } from 'type-graphql';
import { getConnection, createConnection } from 'typeorm';

import { Message } from './graph-models';
import { MessageModel } from './orm-models';

@Resolver(of => Message)
class MessageResolver {

  @Query(returns => Message)
  async message(@Arg('id') id: number): Promise<Message | undefined> {
    const msg = await getConnection().getRepository(MessageModel).findOne(id);
    if (!msg) return undefined;
    return {
      id: msg.id,
      text: msg.text,
      image: msg.imageUrl && msg.thumbUrl ? {
        imageUrl: msg.imageUrl,
        thumbUrl: msg.thumbUrl
      } : undefined,
      publishDate: msg.publishDate
    };
  }
}

(async () => {
  await createConnection({
    name: 'default',
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'hands',
    database: 'typeorm_test',
    entities: [ Message ],
    synchronize: true
  });

  const schema = await buildSchema({
    resolvers: [ MessageResolver ],
    nullableByDefault: true
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(3000);
  console.log(`server started: ${url}`);
})();