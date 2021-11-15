
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import { connection as rabbitConnection } from "@sys.packages/rabbit";

import authRoutes from './routes/auth.mjs';
import notAuthRoutes from './routes/notAuth.mjs';

import rabbit from './rabbit';


(async () => {
  try {
    await rabbitConnection(process.env['RABBIT_CONNECTION_HOST']);

    await rabbit();

    const server = new Server({
      cookie: {
        secret: process.env['JWT_SECRET'],
        name: process.env['COOKIE_NAME'],
        checkUrl: process.env['IDENTITY_API_SRV'] + '/check',
        refreshUrl: process.env['IDENTITY_API_SRV'] + '/refresh',
      },
      server: {
        port: process.env['PORT'],
        origins: process.env['HTTP_ORIGINS'],
      },
      socket: {
        path: process.env['SOCKET_PATH'],
      },
      routes: [
        notAuthRoutes,
      ],
      authRoutes: [
        authRoutes,
      ]
    });

    await server.start();
  }
  catch(error) {

    logger['error'](error);
  }
})();
