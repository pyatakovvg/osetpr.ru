
export { default as Widget } from './components';

export {
  name,
  reducer,

  selectUuid,
  selectItems,
  selectAmount,
  selectIsOpen,
  selectInProcess,

  resetStateAction,

  openCartAction,
  closeCartAction,

  plusQuantityAction,
  minusQuantityAction,

  addProductToCartAction,
  removeProductFromCartAction,

  resetCartAction,
  restoreCartAction,
} from './ducks/slice';

export { getCart } from './ducks/commands';
