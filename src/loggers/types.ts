export type Logger = {
  info: (payload: any) => void;
  debug: (payload: any) => void;
  error: (payload: any) => void;
};