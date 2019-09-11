import { Token, Container } from 'typedi';
import { loadConfigurations } from './config-loader';

export {
  MysqlConfig,
  HttpConfig
} from './types';

import {
  MysqlConfig,
  HttpConfig
} from './types';

import { mysqlConfigMapper, httpConfigMapper } from './config-mappers';

export const initConfiguration = async () => {
  const env = await loadConfigurations(process.env);

  const mysql = mysqlConfigMapper(env);
  const http = httpConfigMapper(env);

  Container.set(new Token<MysqlConfig>(), mysql());
  Container.set(new Token<HttpConfig>(), http());
};