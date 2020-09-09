import products from './dummy-data/Products';
import { auth } from './firebase';

export const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SIGN_IN: 'SIGN_IN',
  SIGH_OUT: 'SIGH_OUT',
};

export const createAction = (type, payload) => {
  return { type, payload };
};

export const initialState = {
  user: null,
  products,
  cart: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actions.ADD_TO_CART:
      if (state.cart.includes(payload.id)) return state;
      return { ...state, cart: [payload.id, ...state.cart] };
    case actions.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item !== payload.id),
      };
    case actions.SIGN_IN:
      return {
        ...state,
        user: payload.user,
      };
    case actions.SIGH_OUT:
      auth.signOut();
      return {
        ...state,
        user: null,
        cart: [],
      };
    default:
      return state;
  }
};

export default reducer;
