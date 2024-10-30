import { PASSPORT_SECRET_KEY } from '@config/auth.js';
import {
  ExtractJwt,
  Strategy,
  type StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import verify from './verify.js';

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PASSPORT_SECRET_KEY,
};

export default new Strategy(opts, verify);
