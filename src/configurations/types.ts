export type MysqlConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type HttpConfig = {
  port: number;
};

export type LogConfig = {
  level: 'INFO' | 'DEBUG' | 'ERROR';
};