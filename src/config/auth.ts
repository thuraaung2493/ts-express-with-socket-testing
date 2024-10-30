export const PASSPORT_SECRET_KEY = process.env.PASSPORT_SECRET_KEY || '';

export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1y';

export const SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS || '10');
