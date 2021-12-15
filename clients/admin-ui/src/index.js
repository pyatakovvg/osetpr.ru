
import Application from '@ui.packages/admin-application';
import { name as dialogReducerName, reducer as dialogReducer } from '@ui.packages/admin-dialog';
import { name as notificationReducerName, reducer as notificationReducer } from '@ui.packages/admin-notifications';

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';
import Composite from './wrappers/Composite';

import './styles/index.module.scss';

import * as worker from './serviceWorker';


try {
  const app = new Application({
    routes,
    navigate,
    useSignIn: true,
    portal: document.getElementById('root'),
    reducers: {
      form: formReducer,
      [dialogReducerName]: dialogReducer,
      [notificationReducerName]: notificationReducer,
    },
    wrappers: { Empty, Navigate, Composite },
  });

  app.start();
  worker.register();
}
catch (error) {

  console.error(error);
}
