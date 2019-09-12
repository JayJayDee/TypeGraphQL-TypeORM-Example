import { Container, Token } from 'typedi';
import { PlayerEntity } from './player';
import { PokemonEntity } from './pokemon';

const AllEntitiesToken = new Token<any[]>();

export {
  PlayerEntity,
  PokemonEntity,
  AllEntitiesToken
};

export const initOrmEntities = async () => {
  const allEntities = [
    PlayerEntity,
    PokemonEntity
  ];
  Container.set(AllEntitiesToken, allEntities);
};