import type { Server, Socket } from 'socket.io';

export default abstract class EventListener {
  constructor(protected io: Server, protected socket: Socket) {}

  abstract emits(): void;
}

export interface Listener {
  new (io: Server, socket: Socket): Listener;

  emits(): void;
}
