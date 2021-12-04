
import Application from '@ui.packages/application';
import { reducer as dialogReducer } from '@ui.packages/dialog';
import { notificationReducer } from '@ui.packages/notifications';
import { name as orderReducerName, reducer as orderReducer } from "@ui.packages/order";

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
      dialog: dialogReducer,
      notifications: notificationReducer,
      [orderReducerName]: orderReducer,
    },
    wrappers: { Empty, Navigate, Composite },
  });

  app.start();
}
catch (error) {

  console.error(error);
}
