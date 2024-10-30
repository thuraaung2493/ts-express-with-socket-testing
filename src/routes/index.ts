import express, { type RequestHandler } from 'express';

class Router {
  public router;

  constructor() {
    this.router = express.Router();
  }

  middleware(...handlers: RequestHandler[]) {
    this.router.use(...handlers);

    return this;
  }

  get(url: string, ...handlers: RequestHandler[]) {
    this.router.get(url, ...handlers);

    return this;
  }

  post(url: string, ...handlers: RequestHandler[]) {
    this.router.post(url, ...handlers);

    return this;
  }
}

export const Route = new Router();
