
export { default as Notifications } from './components';

export {
  selectNotifications,
} from './ducks/slice';

export {
  cleanNotifications,
  pushNotification,
  closeNotification,
} from './ducks/slice';

export { name, reducer } from './ducks/slice';
