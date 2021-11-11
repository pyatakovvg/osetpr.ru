
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  getCommentsRequestAction,
  getCommentsRequestFailAction,
  getCommentsRequestSuccessAction,
} from './ducks/slice';

export {
  selectData,
  selectMeta,
  selectInProcess,
} from './ducks/slice';

export {
  getComments,
} from './ducks/commands';