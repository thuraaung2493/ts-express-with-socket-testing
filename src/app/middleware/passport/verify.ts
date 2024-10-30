import userRepository from '@repositories/user.repository.js';
import { type VerifyCallback } from 'passport-jwt';

interface UserPayload {
  email: string;
  exp: number;
}

const verify: VerifyCallback = async (payload, done) => {
  const { email, exp } = payload as UserPayload;

  const user = await userRepository.first({ email });

  if (user && exp > Date.now() / 1000) {
    return done(null, user);
  }

  return done(null, false);
};

export default verify;
