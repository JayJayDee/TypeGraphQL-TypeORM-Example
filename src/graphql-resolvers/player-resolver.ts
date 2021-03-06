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
    if (player.pokemons) return player.pokemons;

    const found = await this.playerRepo.findOne({
      where: {
        id: player.id
      },
      relations: [ 'pokemons' ]
    });
    if (!found) return [];
    return found.pokemons;
  }

  @FieldResolver()
  async items(@Root() player: Player): Promise<Item[]> {
    if (player.items) return player.items;

    const found = await this.playerRepo.findOne({
      where: {
        id: player.id
      },
      relations: [ 'items' ]
    });
    if (!found) return [];
    return found.items;
  }
}