import { Token, Container } from 'typedi';
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
  const logger = initSimpleLogger();
  Container.set(LoggerToken, logger);
};