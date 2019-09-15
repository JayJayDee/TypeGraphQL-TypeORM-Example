import { Container, Token } from 'typedi';
import { PlayerEntity } from './player';
import { PokemonEntity } from './pokemon';
import { ItemEntity } from './item';

const AllEntitiesToken = new Token<any[]>();

export {
  PlayerEntity,
  PokemonEntity,
  ItemEntity,
  AllEntitiesToken
};

export const initOrmEntities = async () => {
  const allEntities = [
    PlayerEntity,
    PokemonEntity,
    ItemEntity
  ];
  Container.set(AllEntitiesToken, allEntities);
};