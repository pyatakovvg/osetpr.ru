
import { UUID } from "@ui.packages/utils";
import { Notifications } from '@ui.packages/mobile-notifications';
import { middleware as requestMiddleware } from '@ui.packages/request';
import Socket, { middleware as socketMiddleware} from '@ui.packages/socket';
import { checkServiceWorker, registerServiceWorker } from '@ui.packages/web-push';

import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import Application from './Application';
import { reducer as applicationReducer } from './ducks/slice';

import initStore from './redux/initStore';


const defaultOptions = {
  portal: null,
  state: {},
  reducers: {},
  middleware: [],
  wrappers: {},
  useSign: false,
};

async function createReducers(routes) {
  const reducers = {};
  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      const route = routes[key];
      const module = await route['module'];
      reducers[module['name']] = module['reducer'];
    }
  }
  return reducers;
}

async function createRoutes(routes) {
  const reducers = [];
  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      const route = routes[key];
      const module = await route['module'];

      reducers.push({
        path: route['path'],
        wrapper: route['wrapper'] || null,
        Module: module['default'],
      });
    }
  }
  return reducers;
}

function createUserUUID() {
  window.localStorage.setItem('userUuid', UUID());
}

function getUserUUID() {
  return !! window.localStorage.getItem('userUuid');
}

async function checkUserUUID() {
  return new Promise((resolve) => {
    createUserUUID();
    const timerId = setInterval(() => {
      const hasUser = getUserUUID();
      if (hasUser) {
        clearInterval(timerId);
        resolve();
      }
      createUserUUID();
    }, 500);
  });
}

class App {
  constructor(options) {
    let socket;

    if (process.env['REACT_APP_SOCKET_HOST'] && process.env['REACT_APP_SOCKET_PATH']) {
      socket = Socket(process.env['REACT_APP_SOCKET_HOST'], {
        path: process.env['REACT_APP_SOCKET_PATH'],
      });
    }

    this.options = {
      ...defaultOptions,
      ...options,
      reducers: {
        application: applicationReducer,
        ...options['reducers'] || {},
      },
      middleware: [
        thunk,
        socketMiddleware(socket),
        requestMiddleware({
          host: process.env['REACT_APP_API_HOST'],
          silent: true,
        }),
        ...options['middleware'] || [],
      ],
    };
  }

  async start() {
    await checkUserUUID();
    console.log('userUuid created');

    if (checkServiceWorker()) {
      await registerServiceWorker();
      console.log('ServiceWorker\'s file registered');
    }

    const routes = await createRoutes(this.options['routes']);
    const reducers = await createReducers(this.options['routes']);

    this.store = initStore({
      ...reducers,
      ...this.options['reducers'],
    }, this.options['middleware']);

    ReactDOM.render(
      <Provider store={this.store}>
        <BrowserRouter>
          <Application options={{
            ...this.options,
            routes
          }} />
        </BrowserRouter>
      </Provider>
    , this.options['portal']);
  }

  async render() {
    const routes = await createRoutes(this.options['routes']);
    const reducers = await createReducers(this.options['routes']);

    this.store = initStore({
      ...reducers,
      ...this.options['reducers'],
    }, this.options['middleware']);

    return function App() {
      return (
        <Provider store={this.store}>
          <StaticRouter>
            <Application options={{
              ...this.options,
              routes
            }} />
          </StaticRouter>
          <Notifications />
        </Provider>
      );
    }
  }
}

export default App;
export { default as Context } from './Context';
export { signIn, signUp, signOut } from './ducks/commands';
export { selectInProcess, selectProfile, redirectToAction } from './ducks/slice';
