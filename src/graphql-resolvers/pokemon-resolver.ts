import { Resolver, Query, Arg } from 'type-graphql';
import { Pokemon } from '../graphql-models';

@Resolver(of => Pokemon)
export class PokemonResolver {

  @Query(returns => Pokemon)
  async pokemon(@Arg('id') id: string): Promise<Pokemon | undefined> {
    return undefined;
  }
}

// @Resolver(of => Message)
// export class MessageResolver {

//   @Query(returns => Message)
//   async message(@Arg('id') id: number): Promise<Message | undefined> {
//     const msg = await getConnection().getRepository(MessageEntity).findOne(id);
//     if (!msg) return undefined;
//     return {
//       id: msg.id,
//       text: msg.text,
//       image:
//         msg.imageUrl && msg.thumbUrl ? {
//           imageUrl: msg.imageUrl,
//           thumbUrl: msg.thumbUrl
//         } : undefined
//     };
//   }
// }