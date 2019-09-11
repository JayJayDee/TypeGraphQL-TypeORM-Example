import { Logger } from './types';

export const initSimpleLogger = (): Logger =>
  ({
    info: (payload) => console.log(payload),
    debug: (payload) => console.log(payload),
    error: (payload) => console.log(payload)
  });