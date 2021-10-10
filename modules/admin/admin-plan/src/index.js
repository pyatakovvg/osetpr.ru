
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  selectItem,
  selectProducts,
  selectInProcess,
  selectInProductsProcess,
} from './ducks/slice';

export {
  getProducts,

  getItem,
  updateItem,
} from './ducks/commands';