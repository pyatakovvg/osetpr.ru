
import {
  openCartAction,
  closeCartAction,

  removeProductAction,

  restoreCartAction,
  resetCartAction,
} from './actions';


export const openCart = () => dispatch => {
  dispatch(openCartAction());
};

export const closeCart = () => dispatch => {
  dispatch(closeCartAction());
};

export const removeProduct = (id) => dispatch => {
  dispatch(removeProductAction(id));
};

export const getCartFromLocalStorage = () => dispatch => {

  const { localStorage } = window;
  const cart = localStorage.getItem('cart');

  if (cart) {
    dispatch(restoreCartAction(JSON.parse(cart)));
  }
};

export const resetCart = () => dispatch => {

  const { localStorage } = window;

  localStorage.removeItem('cart');

  dispatch(resetCartAction());
};
