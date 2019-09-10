import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { ObjectType, Field, ID, Resolver, Arg, Query, buildSchema } from 'type-graphql';

@ObjectType()
class ImagePayload {
  @Field()
  imageUrl: string;

  @Field()
  thumbUrl: string;
}

@ObjectType()
class Message {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  image?: ImagePayload;
}

@Resolver(of => Message)
class MessageResolver {

  @Query(returns => Message)
  async message(@Arg('id') id: string): Promise<Message> {
    const msg = new Message();
    return msg;
  }
}

(async () => {
  const schema = await buildSchema({
    resolvers: [ MessageResolver ]
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(3000);
  console.log(`server started: ${url}`);
})();