import { Resolver, Query, Arg } from 'type-graphql';
import { Player } from '../graphql-models';

@Resolver(of => Player)
export class PlayerResolver {

  @Query(returns => Player)
  async player(@Arg('id') id: string): Promise<Player | undefined> {
    return undefined;
  }
}