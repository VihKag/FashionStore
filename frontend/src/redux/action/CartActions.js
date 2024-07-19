// CartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS'
export const addToCart = (product, quantity, size, color, productdetailId) => ({
  type: ADD_TO_CART,
  payload: { product, quantity, size, color, productdetailId },
});

export const removeFromCart = (productdetailId) => ({
  type: REMOVE_FROM_CART,
  payload: { productdetailId},
});

export const setSelectedItems = (selectedCartItems) => ({
  type: SET_SELECTED_ITEMS,
  payload: { selectedCartItems },
});