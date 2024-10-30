import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { readdirSync } from 'node:fs';
import { createServer, Server } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { PORT } from '@config/app.js';
import { HTTP_FORMAT } from '@config/log.js';
import Logger from '@utils/logger.js';
import Ws from './ws.js';

export default class App {
  private app!: express.Application;
  private server!: Server;
  private rootDir!: string;

  constructor() {
    this.setRootDir();
    this.init();
  }

  start(): this {
    this.server.listen(PORT, () => {
      Logger.info(`Application is running at port - ${PORT} 🚀`);
    });

    return this;
  }

  withSocketServer() {
    const ws = new Ws(this.server, this.rootDir);

    ws.start();
  }

  private setRootDir() {
    const __filename = fileURLToPath(import.meta.url);
    this.rootDir = path.dirname(__filename);
  }

  private init() {
    this.createServer();
    this.middleware();
    this.routes();
    this.logging();
  }

  private logging() {
    this.app.use(
      morgan(HTTP_FORMAT, {
        stream: {
          write: (message) => Logger.info(message.trim()),
        },
      })
    );
  }

  private createServer() {
    this.app = express();
    this.server = createServer(this.app);
  }

  private middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    const routeDir = path.join(this.rootDir, 'routes');
    const routes = readdirSync(routeDir).filter(
      (file) => !/^index\.|\.map$/.test(file)
    );

    routes.forEach(async (route) => {
      const routeName = path.basename(route, path.extname(route));
      const router = await import(`${routeDir}/${route}`);
      this.app.use(`/${routeName}`, router.default);
    });
  }
}
