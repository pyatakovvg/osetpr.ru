
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  setProcessAction,

  selectItem,
  selectProducts,
  selectCustomers,
  selectInProcess,
  selectInProductsProcess,
} from './ducks/slice';

export {
  getProducts,
  getCustomers,

  getItem,
  createItem,
  updateItem,
} from './ducks/commands';