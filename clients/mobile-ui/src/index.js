
import { UUID } from '@ui.packages/utils';
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


function createUserUUID() {
  window.localStorage.setItem('userUuid', UUID());
}

function getUserUUID() {
  return !! window.localStorage.getItem('userUuid');
}

async function checkUserUUID() {
  return new Promise((resolve, reject) => {
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

    await checkUserUUID();

    app.start();
  }
  catch (error) {

    console.error(error);
  }
})();
