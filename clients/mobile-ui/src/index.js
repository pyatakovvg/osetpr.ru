
import Application from '@ui.packages/mobile-application';
import { reducer as menuReducer, name as menuNameReducer } from '@ui.packages/menu';
import { name as orderReducerName, reducer as orderReducer } from '@ui.packages/order';
import { reducer as dialogReducer, name as dialogNameReducer } from '@ui.packages/mobile-dialog';
import { reducer as notificationReducer, name as notificationNameReducer } from '@ui.packages/mobile-notifications';

import { reducer as formReducer } from 'redux-form';

import routes from './configs/routes';
import navigate from './configs/navigate';

import Empty from './wrappers/Empty';
import Navigate from './wrappers/Navigate';

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
  }
  catch (error) {

    console.error(error);
  }
})();
