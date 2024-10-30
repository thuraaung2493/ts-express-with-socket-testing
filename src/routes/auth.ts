import AuthController from '@controllers/auth.controller.js';
import { jwtAuth } from '@middleware/passport/index.js';
import { Route } from '@routes/index.js';

Route.post('/register', AuthController.register);

Route.post('/login', AuthController.login);

Route.middleware(jwtAuth).post('/verify', AuthController.verify);

export default Route.router;
