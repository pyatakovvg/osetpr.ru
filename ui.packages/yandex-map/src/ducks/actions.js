
import {
  OPEN_CART_LIST,
  CLOSE_CART_LIST,

  REMOVE_PRODUCT_FROM_CART,

  RESTORE_CART,
  RESET_CART,
} from './types';


export const openCartAction = () => ({
  type: OPEN_CART_LIST,
});

export const closeCartAction = () => ({
  type: CLOSE_CART_LIST,
});

export const removeProductAction = (id) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: id,
});


export const restoreCartAction = (data) => ({
  type: RESTORE_CART,
  payload: data,
});

export const resetCartAction = () => ({
  type: RESET_CART,
  payload: null,
});
