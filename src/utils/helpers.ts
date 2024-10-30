import { APP_ENV } from '@config/app.js';

export const isProduction = (): boolean => {
  return APP_ENV === 'production';
};

export const isLocal = (): boolean => {
  return APP_ENV === 'local';
};
