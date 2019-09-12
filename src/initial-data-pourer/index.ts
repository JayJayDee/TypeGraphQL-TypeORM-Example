import { Container } from 'typedi';
import uuid from 'uuid/v4';
import { LoggerToken } from '../loggers';
import { ConnectionToken } from '../orm-initiator';
import { PlayerEntity } from '../orm-entities';

const tag = '[initial-data-pourer]';

// pours initial data to database.
export const pourInitialData = async () => {
  const log = Container.get(LoggerToken);

  if (await isDataExists() === true) {
    log.info(`${tag} data exists.. ignored.`);
  }
  // const connection = Container.get(ConnectionToken);
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
    id: uuid()
  }
]);