import { SALT_ROUNDS } from '@config/auth.js';
import bcrypt from 'bcrypt';

export default class Hash {
  static make(data: string) {
    return bcrypt.hash(data, SALT_ROUNDS);
  }

  static check(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
