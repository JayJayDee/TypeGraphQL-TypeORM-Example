import { config } from 'dotenv';

export const loadConfigurations =
  async (env: {[key: string]: any}) => {
    let source: {[key: string]: any} = {};

    // if the DOTENV_PATH environment variable exists, load the dotenv file.
    const dotEnvPath = env['DOTENV_PATH'];
    if (dotEnvPath) {
      const parsed = config({ path: dotEnvPath }).parsed;
      if (parsed) source = parsed;
      else {
        throw new Error(`dotenv file not found or malformed dotenv file: ${dotEnvPath}`);
      }
    } else {
      source = env;
    }

    return source;
  };