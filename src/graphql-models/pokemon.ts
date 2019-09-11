import 'reflect-metadata';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Player } from './player';

enum PokemonType {
  NORMAL,
  FLYING,
  FIGHTING,
  ELECTRIC,
  FIRE,
  WATER,
  ROCK,
  GRASS
}

// type-graphql feature.
// register typescript enum type to GraphQL schema using reflect-metadata.
registerEnumType(PokemonType, {
  name: 'PokemonType',
  description: 'the type of pokemon.'
});

@ObjectType()
export class Pokemon {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(type => PokemonType)
  type: PokemonType;

  @Field()
  level: number;

  @Field(type => [ Player ])
  ownPlayers: Player[];
}