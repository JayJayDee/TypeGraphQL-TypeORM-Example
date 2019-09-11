import { Token, Container } from 'typedi';
import { LogConfigToken } from '../configurations';

import { initSimpleLogger } from './default-simple-logger';

export {
  Logger
} from './types';

import {
  Logger
} from './types';

const LoggerToken = new Token<Logger>();
export { LoggerToken };

export const initLogger = async () => {
  const logCfg = Container.get(LogConfigToken);
  const logger = initSimpleLogger(logCfg);

  Container.set(LoggerToken, logger);
};