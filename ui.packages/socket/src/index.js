
import { io } from 'socket.io-client';


let socket = null;
let room = null;


export default (host, options) => {
  socket = io(host, {
    forceNew: true,
    path: options['path'] || '/socket.io',
    transports: ['websocket'],
    reconnection: true,
  });

  socket.on('connect', () => {
    if (room) {
      joinToRoom(room);
    }
    process.env['NODE_ENV'] === 'development' && console.log(`Socket: произведено подключение к "${host}${options['path']}"`);
  });
  socket.on('disconnect', (reason) => process.env['NODE_ENV'] === 'development' && console.log('Socket: соединение разорвано ' + reason));

  return socket;
}

export const connect = () => {
  if ( ! socket) {
    return void 0;
  }
  socket.open();
  process.env['NODE_ENV'] === 'development' && console.log(`Socket: выполняется соединение`);
};

export const disconnect = () => {
  if ( ! socket) {
    return void 0;
  }
  socket.close();
  process.env['NODE_ENV'] === 'development' && console.log(`Socket: выполняется отключение`);
};

export const joinToRoom = (roomName) => {

  socket.emit('join', String(roomName));
  room = roomName;
  process.env['NODE_ENV'] === 'development' && console.log(`Socket: выполняется подключение к комнате "${roomName}"`);
};

export const leaveFromRoom = (roomName) => {

  socket.emit('leave', String(roomName));
  room = null;
  process.env['NODE_ENV'] === 'development' && console.log(`Socket: выполняется отключение от комнаты "${roomName}"`);
};

export const on = (eventName, cb) => {
  if (socket) {
    socket.on(eventName, (event) => {
      cb(event);
    });
    process.env['NODE_ENV'] === 'development' && console.log(`Socket: подписка на событие "${eventName}"`);
  }
  else {
    setTimeout(() => on(eventName, cb), 1000);
  }
};

export const off = (eventName) => {
  if (socket) {
    socket.off(eventName);
    process.env['NODE_ENV'] === 'development' && console.log(`Socket: отписка от события "${eventName}"`);
  }
  else {
    setTimeout(() => off(eventName), 1000);
  }
};

export const middleware = (socket) => {
  return ({ dispatch }) => {
    socket.on('action', dispatch);
    return (next) => (action) => {
      return next(action);
    };
  };
};
