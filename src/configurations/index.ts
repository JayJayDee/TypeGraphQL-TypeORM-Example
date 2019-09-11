import { Token, Container } from 'typedi';
import { loadConfigurations } from './config-loader';

const MysqlConfigToken = new Token<MysqlConfig>();
const HttpConfigToken = new Token<HttpConfig>();
const LogConfigToken = new Token<LogConfig>();

export {
  MysqlConfig,
  HttpConfig
} from './types';

export {
  MysqlConfigToken,
  HttpConfigToken,
  LogConfigToken
};

import {
  MysqlConfig,
  HttpConfig,
  LogConfig
} from './types';

import {
  mysqlConfigMapper,
  httpConfigMapper,
  logConfigMapper
} from './config-mappers';

export const initConfiguration = async () => {
  const env = await loadConfigurations(process.env);

  const mysql = mysqlConfigMapper(env);
  const http = httpConfigMapper(env);
  const log = logConfigMapper(env);

  Container.set(MysqlConfigToken, mysql());
  Container.set(HttpConfigToken, http());
  Container.set(LogConfigToken, log());
};