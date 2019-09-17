import { ObjectType, Field, ID } from 'type-graphql';

import { Pokemon } from './pokemon';
import { Item } from './item';

@ObjectType()
export class Player {
  @Field(type => ID)
  public id: string;

  @Field()
  public name: string;

  @Field(type => [ Pokemon ])
  public pokemons: Pokemon[];

  @Field(type => [ Item ])
  public items: Item[];

  @Field()
  public fund: number;
}