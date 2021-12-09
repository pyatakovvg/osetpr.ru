
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectItem,
  selectPlans,
  selectInProcess,
} from './ducks/slice';

export {
  getItem,
  getPlans,
  updateCustomer,
} from './ducks/commands';