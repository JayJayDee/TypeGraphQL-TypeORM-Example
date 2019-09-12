import { Container, Token } from 'typedi';
import { createConnection, Connection } from 'typeorm';
import { MysqlConfigToken } from '../configurations';
import { AllEntitiesToken } from '../orm-entities';
import { LoggerToken } from '../loggers';

const ConnectionToken = new Token<Connection>();

const tag = '[orm-initiator]';

const initDatabaseConnection =
  async () => {
    const mysql = Container.get(MysqlConfigToken);
    const entities = Container.get(AllEntitiesToken);
    const log = Container.get(LoggerToken);

    const connection = await createConnection({
      entities,
      name: 'default',
      type: 'mysql',
      host: mysql.host,
      port: mysql.port,
      username: mysql.user,
      password: mysql.password,
      database: mysql.database,
      synchronize: true
    });

    log.info(`${tag} database connection established`);
    Container.set(ConnectionToken, connection);
  };

export {
  initDatabaseConnection,
  ConnectionToken
};