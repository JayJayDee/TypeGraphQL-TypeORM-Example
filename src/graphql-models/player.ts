import { ObjectType, Field, ID } from 'type-graphql';

import { Pokemon } from './pokemon';
import { Item } from './item';

@ObjectType()
export class Player {
  @Field(type => ID)
  public id: string;

  @Field({
    description: 'name of player'
  })
  public name: string;

  @Field(type => [ Pokemon ], {
    description: 'Pokemons that owned by player'
  })
  public pokemons: Pokemon[];

  @Field(type => [ Item ], {
    description: 'Items in inventory'
  })
  public items: Item[];

  @Field({
    description: 'Money'
  })
  public fund: number;
}
