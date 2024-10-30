namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string;
    PORT: string;
    PASSPORT_SECRET_KEY: string;
    TOKEN_EXPIRE_TIME: string;
    SALT_ROUNDS: string;
  }
}

namespace Express {
  interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
  interface Request {
    user?: User;
  }
}
