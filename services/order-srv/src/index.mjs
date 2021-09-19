
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import connectToDatabase from '@sys.packages/db';
import { connection as rabbitConnection } from "@sys.packages/rabbit";

import routes from './routes';

// import rabbit from './rabbit';


(async () => {
  try {
    await connectToDatabase(process.env['DB_CONNECTION_HOST']);
    await rabbitConnection(process.env['RABBIT_CONNECTION_HOST']);

    // await rabbit();

    const server = new Server({
      server: {
        port: process.env['PORT'],
      },
      routes: [
        routes,
      ],
    });

    await server.start();
  }
  catch(error) {

    logger['error'](error);
  }
})();
