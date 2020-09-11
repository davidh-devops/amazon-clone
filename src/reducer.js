import { auth, db, collections } from './firebase';

export const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGH_OUT: 'SIGH_OUT',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CART: 'SET_CART',
  SET_ORDERS: 'SET_ORDERS',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  EMPTY_CART: 'EMPTY_CART',
  ADD_ORDER: 'ADD_ORDER',
};

export const createAction = (type, payload) => {
  return { type, payload };
};

export const initialState = {
  user: null,
  products: [],
  cart: [],
  orders: [],
};

const reducer = (state, { type, payload }) => {
  let newCart;

  switch (type) {
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
        orders: [],
      };
    case actions.SET_PRODUCTS:
      return { ...state, products: payload?.products || [] };
    case actions.SET_CART:
      return { ...state, cart: payload?.cart || [] };
    case actions.SET_ORDERS:
      return { ...state, orders: payload?.orders || [] };
    case actions.ADD_TO_CART:
      newCart = [payload.id, ...state.cart];
      if (state.cart.includes(payload.id)) return state;
      if (state.user) {
        db.collection(collections.users)
          .doc(state.user?.uid)
          .update({ cart: newCart });
      }
      return { ...state, cart: newCart };
    case actions.REMOVE_FROM_CART:
      newCart = state.cart.filter((item) => item !== payload.id);
      if (state.user) {
        db.collection(collections.users)
          .doc(state.user?.uid)
          .update({ cart: newCart });
      }
      return {
        ...state,
        cart: newCart,
      };
    case actions.EMPTY_CART:
      if (state.user) {
        db.collection(collections.users)
          .doc(state.user?.uid)
          .collection(collections.cart)
          .delete();
      }
      return { ...state, cart: [] };
    case actions.ADD_ORDER:
      if (state.user) {
        db.collection(collections.users)
          .doc(state.user?.uid)
          .collection(collections.orders)
          .doc(payload.order.id)
          .set({
            cart: state.cart,
            amount: payload.order.amount,
            createdAt: payload.order.created,
          });
      }
      return {
        ...state,
        cart: [],
        orders: [
          {
            id: payload.order.id,
            cart: state.cart,
            amount: payload.order.amount,
            createdAt: payload.order.created,
          },
          ...state.orders,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
