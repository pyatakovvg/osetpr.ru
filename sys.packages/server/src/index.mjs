
import { middlewareErrors } from "@packages/errors";

import logger from '@sys.packages/logger';
import { middleware } from '@sys.packages/jwt';
import createSocket from "@sys.packages/socket.io";

import Koa from 'koa';
import http from "http";
import Router from 'koa-router';
import cookie from 'koa-cookie';
import userAgent from 'koa2-useragent';
import bodyParser from 'koa-bodyparser';

import CORS from "./cors.mjs";
import loggerRequests from "./logger.mjs";


const defaultOptions = {
  name: 'Server app',
  server: {
    port: 8080,
    origins: '',
  },
  auth: {
    cookie: null,
    endpoint: null,
  },
  socket: {
    path: null,
  },
  middlewares: [],
  routes: [],
  authRoutes: [],
};


export class Server {
  _server = null;
  _koa = null;
  _options = {};

  constructor(options) {
    this._options = {
      ...defaultOptions,
      ...options,
    };

    this._koa = new Koa();

    this._koa.proxy = true;

    this._koa.use(userAgent());
    this._koa.use(loggerRequests);

    this._koa.use(bodyParser({
      enableTypes: ['json', 'form'],
      onerror: (err, ctx) => {
        ctx.throw(422, 'body parse error');
      }
    }));

    this._koa.use(middlewareErrors());

    if (this._options.server.origins) {
      this._koa.use(CORS({
        credentials: true,
        allowedOrigins: this._options.server.origins.split(','),
        allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      }));
    }

    this._koa.use(cookie.default());

    this._createRouters(this._options.routes);

    if ( !! this._options.authRoutes.length) {
      this._koa.use(middleware({
        cookieName: this._options.cookie.name,
        secret: this._options.cookie.secret,
        checkUrl: this._options.cookie.checkUrl,
        refreshUrl: this._options.cookie.refreshUrl,
      }));

      this._createRouters(this._options.authRoutes);
    }
  }

  _createRouters(routers) {
    routers.forEach((router) => {
      const rt = new Router();
      router(rt);
      this._koa.use(rt.routes());
      this._koa.use(rt.allowedMethods());
    });
  }

  async start() {

    this._server = http.createServer(this._koa.callback());

    if (this._options.socket.path) {
      await createSocket(this._server, { path: this._options.socket.path });
    }

    this._server.listen(this._options.server.port, '0.0.0.0', () => {
      logger['info']('Server started on port ' + this._options.server.port);
    });
  }
}
