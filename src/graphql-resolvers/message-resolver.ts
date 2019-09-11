import { Resolver, Query, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';

import { Message } from '../graphql-models';
import { MessageModel } from '../orm-entities';

@Resolver(of => Message)
export class MessageResolver {

  @Query(returns => Message)
  async message(@Arg('id') id: number): Promise<Message | undefined> {
    const msg = await getConnection().getRepository(MessageModel).findOne(id);
    if (!msg) return undefined;
    return {
      id: msg.id,
      text: msg.text,
      image:
        msg.imageUrl && msg.thumbUrl ? {
          imageUrl: msg.imageUrl,
          thumbUrl: msg.thumbUrl
        } : undefined
    };
  }
}