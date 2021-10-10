
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectCustomer,
  selectInProcess,
} from './ducks/slice';

export {
  getCustomer,

} from './ducks/commands';