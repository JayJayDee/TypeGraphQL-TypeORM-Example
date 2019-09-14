import { Container } from 'typedi';
import * as uuid from 'uuid/v4';
import { LoggerToken } from '../loggers';
import { ConnectionToken } from '../orm-initiator';
import { PlayerEntity, PokemonEntity } from '../orm-entities';

const tag = '[initial-data-pourer]';

enum PokemonType {
  NORMAL = 'NORMAL',
  FLYING = 'FLYING',
  FIGHTING = 'FIGHTING',
  ELECTRIC = 'ELECTRIC',
  FIRE = 'FIRE',
  WATER = 'WATER',
  ROCK = 'ROCK',
  GRASS = 'GRASS'
}

// pours initial data to database.
export const pourInitialData = async () => {
  const log = Container.get(LoggerToken);

  if (await isDataExists() === true) {
    log.info(`${tag} data exists.. ignored.`);
  }
  const connection = Container.get(ConnectionToken);

  await connection
    .createQueryBuilder()
    .insert()
    .into(PokemonEntity)
    .values(pokemons())
    .execute();

  log.info(`${tag} initial data poured to the database.`);
};

// returns is data exists
const isDataExists = async () => {
  const connection = Container.get(ConnectionToken);
  const dataSize = await connection.getRepository(PlayerEntity).count();
  if (dataSize === 0) return false;
  return true;
};

export const pokemons = () => ([
  {
    id: uuid(),
    name: 'Pikachu',
    level: 12,
    type: PokemonType.ELECTRIC
  },
  {
    id: uuid(),
    name: 'Salamander',
    level: 19,
    type: PokemonType.FIRE
  },
  {
    id: uuid(),
    name: 'Bulbarsar',
    level: 17,
    type: PokemonType.GRASS
  },
  {
    id: uuid(),
    name: 'Machop',
    level: 15,
    type: PokemonType.FIGHTING
  },
  {
    id: uuid(),
    name: 'Rattata',
    level: 12,
    type: PokemonType.NORMAL
  },
  {
    id: uuid(),
    name: 'Pidgey',
    level: 9,
    type: PokemonType.FLYING
  }
]);