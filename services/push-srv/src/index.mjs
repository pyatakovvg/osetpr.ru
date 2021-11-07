
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import { connection as rabbitConnection } from "@sys.packages/rabbit";

import webPush from 'web-push';

import routes from './routes';
// import rabbit from './rabbit';


(async () => {
  try {
    await rabbitConnection(process.env['RABBIT_CONNECTION_HOST']);

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
        routes,
      ],
    });

    webPush.setVapidDetails(
      'mailto:pyatakov.viktor@gmail.com',
      process.env['PUBLIC_KEY'], // process.env.VAPID_PUBLIC_KEY,
      process.env['PRIVATE_KEY'], // process.env.VAPID_PRIVATE_KEY
    )
      // .then(() => console.log(234567))
      // .catch((e) => console.log(e));

    await server.start();
  }
  catch(error) {

    logger['error'](error);
  }
})();
