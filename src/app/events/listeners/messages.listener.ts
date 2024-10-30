import MessagesHandler from '@events/handlers/messages.handler.js';
import EventListener from '@events/index.js';

export default class MessageEventListener extends EventListener {
  emits() {
    const handler = new MessagesHandler(this.io, this.socket);

    this.socket.on('join', handler.join);
    this.socket.on(`messages:send`, handler.sendMessage);
    this.socket.on(`messages:viewed`, handler.viewMessage);
  }
}
