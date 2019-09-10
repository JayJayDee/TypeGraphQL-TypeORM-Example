import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { ObjectType, Field, ID, Resolver, Arg, Query, buildSchema } from 'type-graphql';
import { createConnection, Entity, PrimaryGeneratedColumn, Column, getConnection } from 'typeorm';

@ObjectType()
@Entity({ name: 'message' })
class Message {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 30 })
  text?: string;
}

@Resolver(of => Message)
class MessageResolver {

  @Query(returns => Message)
  async message(@Arg('id') id: number): Promise<Message | undefined> {
    const msg = await getConnection().getRepository(Message).findOne(id);
    return msg;
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
    resolvers: [ MessageResolver ]
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(3000);
  console.log(`server started: ${url}`);
})();