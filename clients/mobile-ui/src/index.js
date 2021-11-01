
import { UUID } from '@ui.packages/utils';
import Application from '@ui.packages/application';
import { reducer as menuReducer, name as menuNameReducer } from '@ui.packages/menu';
import { reducer as dialogReducer, name as dialogNameReducer } from '@ui.packages/mobile-dialog';
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
      [menuNameReducer]: menuReducer,
      [orderReducerName]: orderReducer,
      [dialogNameReducer]: dialogReducer,
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
