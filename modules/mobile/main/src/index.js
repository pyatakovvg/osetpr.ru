
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectFilter,
  selectProducts,
} from './ducks/slice';

export {
  getProducts,
} from './ducks/commands';