import MessageController from '@controllers/message.controller.js';
import { jwtAuth } from '@middleware/passport/index.js';
import { Route } from '@routes/index.js';

Route.middleware(jwtAuth)
  .get('/users', MessageController.getUserLists)
  .get('/users/:id', MessageController.getConversactionLists);

export default Route.router;
