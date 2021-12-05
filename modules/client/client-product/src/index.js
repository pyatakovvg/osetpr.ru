
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectProduct,
  selectInProcess,
} from './ducks/slice';

export {
  getProduct,
} from './ducks/commands';