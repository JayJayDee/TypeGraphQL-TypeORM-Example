import { config } from 'dotenv';

export const loadConfigurations =
  async (env: {[key: string]: any}) => {
    let source: {[key: string]: any} = {};

    // if the DOTENV_PATH environment variable exists, load the dotenv file.
    const dotEnvPath = env['DOTENV_PATH'];
    if (dotEnvPath) {
      source = config({
        path: dotEnvPath
      });
    } else {
      source = env;
    }

    return source;
  };