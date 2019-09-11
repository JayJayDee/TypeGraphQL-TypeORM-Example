import { Logger } from './types';

type LogLevel = 'DEBUG' | 'INFO' | 'ERROR';

export const initSimpleLogger = ({ level }:
  { level: LogLevel }): Logger =>
    ({
      info: (payload) => console.log(build('info', payload)),
      debug: (payload) => console.log(build('debug', payload)),
      error: (payload) => console.log(build('error', payload))
    });

const build = (level: string, payload: any) =>
  `[${Date.now()}@${level}] ${payload}`;