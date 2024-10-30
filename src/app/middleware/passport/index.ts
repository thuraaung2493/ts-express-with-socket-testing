import passport from 'passport';
import jwtStrategy from './jwtStrategy.js';

passport.use(jwtStrategy);

export const jwtAuth = passport.authenticate('jwt', { session: false });
