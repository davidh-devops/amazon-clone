import products from './dummy-data/Products';

export const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

export const createAction = (type, payload) => {
  return { type, payload };
};

export const initialState = {
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
    default:
      return state;
  }
};

export default reducer;
