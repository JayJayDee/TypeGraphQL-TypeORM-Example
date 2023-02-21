import { Repository } from 'typeorm';
import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Container } from 'typedi';
import { Pokemon, Player } from '../graphql-models';

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
      relations: [ 'ownedBy' ]
    });
  }

  @FieldResolver()
  async ownedBy(@Root() pokemon: Pokemon): Promise<Player[]> {
    if (pokemon.ownedBy) return pokemon.ownedBy;

    const found = await this.pokemonRepo.findOne({
      where: {
        id: pokemon.id
      },
      relations: [ 'ownedBy' ]
    });
    if (!found) return [];
    return found.ownedBy;
  }
}
