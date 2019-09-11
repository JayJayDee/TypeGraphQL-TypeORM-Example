import { MysqlConfig, HttpConfig } from './types';

class ConfigurationNotSuppliedError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

type Source = {[key: string]: any};

type ReadRule = {
  key: string;
  mandantory: boolean;
  defaultValue?: any;
};

type ConfigLoader<T> = (source: Source) => () => T;

export const read = (source: Source) =>
  (rule: ReadRule) => {
    // when the value was not exist in configuration kv-map:
    if (source[rule.key] === undefined) {
      if (rule.mandantory === true) throw new ConfigurationNotSuppliedError(`${rule.key} configuration not supplied.`);
      if (rule.defaultValue) return rule.defaultValue;
      return null;
    }
    // case of key exist in configuration key-value map.
    return source[rule.key];
  };

// mysql configuration loader.
export const mysqlConfigMapper: ConfigLoader<MysqlConfig> =
  (source) => () =>
    ({
      host: read(source) ({ key: 'MYSQL_HOST', mandantory: true }),
      user: read(source) ({ key: 'MYSQL_USER', mandantory: true }),
      password: read(source) ({ key: 'MYSQL_PASSWORD', mandantory: true }),
      database: read(source) ({ key: 'MYSQL_DATABASE', mandantory: true })
    });

// http configuration loader.
export const httpConfigMapper: ConfigLoader<HttpConfig> =
  (source) => () =>
    ({
      port: read(source) ({ key: 'HTTP_PORT', mandantory: true })
    });