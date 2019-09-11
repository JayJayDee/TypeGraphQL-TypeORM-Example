import { ObjectType, Field, ID } from 'type-graphql';

import { Pokemon } from './pokemon';

@ObjectType()
export class Player {
  @Field(type => ID)
  public id: string;

  @Field()
  public name: string;

  @Field(type => [ Pokemon ])
  public pokemons: Pokemon[];

  @Field()
  public fund: number;
}