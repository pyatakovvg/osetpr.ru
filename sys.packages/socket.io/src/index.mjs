
import logger from '@sys.packages/logger';

import { Server } from 'socket.io';


let io = null;


export default async (server, options = {}) => {
  try {
    io = new Server(server, {
      path: options['path'] || '/admin.socket.io',
      transports: ['websocket'],
    });

    io.use((socket, next) => {
      return next();
    });

    io.on('connection', (client) => {

      client.on('join', (room) => {
        client.join(room);
        logger['info']('Socket: joined to room: ' + room);
      });

      client.on('leave', (room) => {
        client.leave(room);
        logger['info']('Socket: leave from room: ' + room);
      });

      client.on('disconnect', () => {
        logger['info']('Socket: disconnect');
      });

      logger['info']('Socket: connected');
    });

    logger['info']('Socket: created');

    return io;
  }
  catch(error) {

    logger['error']('Socket: ' + error)
  }
}

export const emitToRoom = (room, type, payload) => {

  io.sockets.in(room).emit('action', {
    type,
    payload,
  })
};

export const emit = (type, payload, isAction = false) => {
  if (isAction) {
    io.sockets.emit('action', {
      type,
      payload,
    });
    logger.info(`Socket: Отправлено сообщение "${JSON.stringify(payload)}" в канал "action"`);
  }
  else {
    io.sockets.emit(type, payload);
    logger.info(`Socket: Отправлено сообщение "${JSON.stringify(payload)}" в канал "${type}"`);
  }
};

export const on = (type, cb) => {
  io.on(type, cb);
};
