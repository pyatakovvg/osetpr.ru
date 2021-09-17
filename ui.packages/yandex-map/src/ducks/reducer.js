
import {
  RESET_CART,
  RESTORE_CART,

  OPEN_CART_LIST,
  CLOSE_CART_LIST,

  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './types';


const initialState = {
  isOpen: false,
  items: [],
};


export const KEY = 'cart';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_CART_LIST: return {
      ...state,
      isOpen: true,
    };
    case CLOSE_CART_LIST: return {
      ...state,
      isOpen: false,
    };

    case ADD_PRODUCT_TO_CART: {
      const { localStorage } = window;
      const item = {
        ...payload,
        goal: '',
        type: 'on-prescription',
        recipe: {},
        lens: {},
        file: null,
      };
      const newItems = [
        ...state['items'],
        item,
      ];

      localStorage.setItem('cart', JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
      };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const itemIndex = state['items'].findIndex(item => item['id'] === payload);
      const newItems = [
        ...state['items'].slice(0, itemIndex),
        ...state['items'].slice(itemIndex + 1),
      ];

      localStorage.setItem('cart', JSON.stringify(newItems));

      return {
        ...state,
        items: newItems,
      };
    }
    case UPDATE_PRODUCT_IN_CART: {
      const products = state['items'].map(product => {
        if (product['id'] === payload['id']) {
          return {
            ...product,
            ...payload,
          };
        }
        return product;
      });
      return {
        ...state,
        items: products,
      };
    }

    case RESTORE_CART: return {
      ...state,
      items: payload,
    };
    case RESET_CART: return {
      ...state,
      items: [],
    };

    default: return state;
  }
}