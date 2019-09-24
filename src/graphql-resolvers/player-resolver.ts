import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';
import { Player, Pokemon, Item } from '../graphql-models';
import { Container } from 'typedi';
import { ConnectionToken } from '../orm-initiator';
import { PlayerEntity } from '../orm-entities';

@Resolver(of => Player)
export class PlayerResolver {

  private playerRepo: Repository<PlayerEntity>;
  // private pokemonRepo: Repository<PokemonEntity>;

  constructor() {
    const connection = Container.get(ConnectionToken);
    this.playerRepo = connection.getRepository(PlayerEntity);
    // this.pokemonRepo = connection.getRepository(PokemonEntity);
  }

  @Query(returns => Player)
  async player(@Arg('id') id: string): Promise<Player | undefined> {
    return await this.playerRepo.findOne({ id }, {
      relations: [ 'pokemons', 'items' ]
    });
  }

  @Query(returns => [ Player ])
  async players(): Promise<Player[]> {
    return await this.playerRepo.find({
      relations: [ 'pokemons', 'items' ]
    });
  }

  @FieldResolver()
  async pokemons(@Root() player: Player): Promise<Pokemon[]> {
    return player.pokemons;
  }

  @FieldResolver()
  async items(@Root() player: Player): Promise<Item[]> {
    return player.items;
  }
}