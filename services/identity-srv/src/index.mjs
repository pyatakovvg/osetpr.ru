
import logger from '@sys.packages/logger';
import { Server } from '@sys.packages/server';
import connectToDatabase from '@sys.packages/db';
import { connection as connectToRabbit } from "@sys.packages/rabbit";

import routes from './routes';


(async () => {
  try {
    await connectToDatabase(process.env['DB_CONNECTION_HOST']);
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

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
