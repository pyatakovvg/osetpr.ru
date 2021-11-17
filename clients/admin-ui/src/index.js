
import Application from '@ui.packages/application';
import { reducer as dialogReducer } from '@ui.packages/dialog';

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
      dialog: dialogReducer,
    },
    wrappers: { Empty, Navigate, Composite },
  });

  app.start();
  worker.register();
}
catch (error) {

  console.error(error);
}
