import Logger from '@utils/logger.js';
import { readdirSync } from 'node:fs';
import { Server } from 'node:http';
import path from 'node:path';
import { Socket, Server as SocketServer, type ServerOptions } from 'socket.io';

export default class Ws {
  private readonly server: Server;
  private readonly rootDir: string;
  private io?: SocketServer;

  constructor(server: Server, rootDir: string) {
    this.server = server;
    this.rootDir = rootDir;
  }

  start() {
    this.io = new SocketServer(this.server, this.getOptions());

    this.io.on('connection', this.onConnection.bind(this));
  }

  private getOptions(): Partial<ServerOptions> {
    return {
      cors: {
        origin: 'http://localhost:3000',
      },
    } as const;
  }

  private onConnection(socket: Socket) {
    Logger.info('Socket server is running...');
    Logger.info(`A user is connected, id: ${socket.id}`);

    this.registerListeners(socket);

    socket.on('disconnect', () => {
      Logger.info('Socket server is disconnected!');
    });
  }

  public registerListeners(socket: Socket) {
    const listenersDir = path.join(this.rootDir, 'app/events/listeners');
    const listeners = readdirSync(listenersDir).filter(
      (file) => !/^index\.|\.map$/.test(file)
    );

    listeners.forEach(async (listener) => {
      const listenerModule = await import(`${listenersDir}/${listener}`);
      const EventListener = listenerModule.default as Listener;
      new EventListener(this.io!, socket).emits();
    });
  }
}

interface Listener {
  new (io: SocketServer, socket: Socket): Listener;

  emits(): void;
}
