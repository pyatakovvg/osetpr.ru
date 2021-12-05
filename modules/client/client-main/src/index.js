
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectMeta,
  selectFilter,
  selectProducts,
} from './ducks/slice';

export {
  getProducts,
} from './ducks/commands';