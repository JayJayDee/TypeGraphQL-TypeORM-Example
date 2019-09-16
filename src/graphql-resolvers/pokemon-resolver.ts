import { Repository } from 'typeorm';
import { Resolver, Query, Arg } from 'type-graphql';
import { Container } from 'typedi';
import { Pokemon } from '../graphql-models';

import { PokemonEntity } from '../orm-entities';
import { ConnectionToken } from '../orm-initiator';

@Resolver(of => Pokemon)
export class PokemonResolver {

  private pokemonRepo: Repository<PokemonEntity>;

  constructor() {
    const connection = Container.get(ConnectionToken);
    this.pokemonRepo = connection.getRepository(PokemonEntity);
  }

  @Query(returns => Pokemon)
  async pokemon(@Arg('id') id: string): Promise<Pokemon | undefined> {
    return await this.pokemonRepo.findOne({ id }, {
      relations: [ 'ownedBy' ]
    });
  }

  @Query(returns => [ Pokemon ])
  async pokemons(): Promise<Pokemon[]> {
    return await this.pokemonRepo.find({
      relations: [' ownedBy' ]
    });
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