
import Application from '@ui.packages/client-application';
import { name as orderReducerName, reducer as orderReducer } from "@ui.packages/order";
import { name as dialogReducerName, reducer as dialogReducer } from '@ui.packages/client-dialog';
import { name as notificationReducerName, reducer as notificationReducer } from '@ui.packages/client-notifications';

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
      [orderReducerName]: orderReducer,
      [dialogReducerName]: dialogReducer,
      [notificationReducerName]: notificationReducer,
    },
    wrappers: { Empty, Navigate, Composite },
  });

  app.start();
}
catch (error) {

  console.error(error);
}
