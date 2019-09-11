import { Token, Container } from 'typedi';
import { loadConfigurations } from './config-loader';

const MysqlConfigToken = new Token<MysqlConfig>();
const HttpConfigToken = new Token<HttpConfig>();

export {
  MysqlConfig,
  HttpConfig
} from './types';

export {
  MysqlConfigToken,
  HttpConfigToken
};

import {
  MysqlConfig,
  HttpConfig
} from './types';

import { mysqlConfigMapper, httpConfigMapper } from './config-mappers';

export const initConfiguration = async () => {
  const env = await loadConfigurations(process.env);

  const mysql = mysqlConfigMapper(env);
  const http = httpConfigMapper(env);

  Container.set(MysqlConfigToken, mysql());
  Container.set(HttpConfigToken, http());
};