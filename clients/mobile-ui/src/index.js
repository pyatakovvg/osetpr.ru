
import Application from '@ui.packages/mobile-application';
import { name as orderReducerName, reducer as orderReducer } from '@ui.packages/order';
import { reducer as menuReducer, name as menuNameReducer } from '@ui.packages/mobile-menu';
import { reducer as dialogReducer, name as dialogNameReducer } from '@ui.packages/mobile-dialog';
import { reducer as notificationReducer, name as notificationNameReducer } from '@ui.packages/mobile-notifications';

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';

import * as worker from './serviceWorker';

import './styles/index.module.scss';


(async function() {
  try {
    const app = new Application({
      routes,
      navigate,
      useSignIn: false,
      portal: document.getElementById('root'),
      reducers: {
        form: formReducer,
        [menuNameReducer]: menuReducer,
        [orderReducerName]: orderReducer,
        [dialogNameReducer]: dialogReducer,
        [notificationNameReducer]: notificationReducer,
      },
      wrappers: { Empty, Navigate },
    });

    await app.start();

    worker.register();
  }
  catch (error) {

    console.error(error);
  }
})();
