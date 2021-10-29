
import { UUID } from '@ui.packages/utils';
import Application from '@ui.packages/application';
import { notificationReducer } from '@ui.packages/notifications';
import { name as orderReducerName, reducer as orderReducer } from '@ui.packages/order';

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';
import Composite from './wrappers/Composite';

import './styles/index.module.scss';


try {
  const app = new Application({
    routes,
    navigate,
    useSignIn: false,
    portal: document.getElementById('root'),
    reducers: {
      form: formReducer,
      notifications: notificationReducer,
      [orderReducerName]: orderReducer,
    },
    wrappers: { Empty, Navigate, Composite },
  });

  if ( ! window.localStorage.getItem('userUuid')) {
    window.localStorage.setItem('userUuid', UUID());
  }

  app.start();
}
catch (error) {

  console.error(error);
}
