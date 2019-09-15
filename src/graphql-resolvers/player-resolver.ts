import { Resolver, Query, Arg } from 'type-graphql';
import { Repository } from 'typeorm';
import { Player } from '../graphql-models';
import { Container } from 'typedi';
import { ConnectionToken } from '../orm-initiator';
import { PlayerEntity } from '../orm-entities';

@Resolver(of => Player)
export class PlayerResolver {

  private playerRepo: Repository<PlayerEntity>;

  constructor() {
    const connection = Container.get(ConnectionToken);
    this.playerRepo = connection.getRepository(PlayerEntity);
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
}