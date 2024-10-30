import { PASSPORT_SECRET_KEY, TOKEN_EXPIRE_TIME } from '@config/auth.js';
import jsonwebtoken from 'jsonwebtoken';

export default class JsonWebToken {
  static create(payload: string | object) {
    return jsonwebtoken.sign(payload, PASSPORT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });
  }
}
