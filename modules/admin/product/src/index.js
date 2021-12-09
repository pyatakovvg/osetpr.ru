
export { default } from './components';
export { name, reducer } from './ducks/slice';

export {
  resetStateAction,

  setProcessAction,

  selectGroups,
  selectGallery,
  selectProduct,
  selectInProcess,
  selectCategories,
  selectCurrencies,
  selectInCreateProcess,
} from './ducks/slice';

export {
  getGroups,
  getCategories,
  getCurrencies,
  createGallery,
  createProduct,
  getProductById,
  updateProductsById,
} from './ducks/commands';
