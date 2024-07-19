// CartReducer.js
// Hàm để lấy cartItems từ localStorage
const getCartFromLocalStorage = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const email = userInfo ? userInfo.email : null;
  if (email) {
    const cart = localStorage.getItem(`cartItems_${email}`);
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cartItems) => {
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const email = userInfo ? userInfo.email : null;
  if (email) {
    localStorage.setItem(`cartItems_${email}`, JSON.stringify(cartItems));
  }
};

const initialState = {
  cartItems: getCartFromLocalStorage(),
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, quantity, size, color, productdetailId } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        // item => item.product.id === product.id && item.size === size && item.color === color
        item => item.productdetailId ===productdetailId
      );

      let updatedCartItems;
      if (existingItemIndex > -1) {
        updatedCartItems = state.cartItems.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { product, quantity, size, color, productdetailId }];
      }

      // Lưu cartItems vào localStorage
      saveCartToLocalStorage(updatedCartItems);

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    // Thêm các case khác nếu cần (REMOVE_FROM_CART, UPDATE_QUANTITY, ...)
    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return { ...state, cartItems: [] };
    
      case 'REMOVE_FROM_CART':
        const { productdetailId: removeProductdetailId } = action.payload;
        const updatedItems = state.cartItems.filter(item => item.productdetailId !== removeProductdetailId);
        saveCartToLocalStorage(updatedItems);
        return { ...state, cartItems: updatedItems };

    case 'UPDATE_CART':
      saveCartToLocalStorage(action.payload);
      return { ...state, cartItems: action.payload };
      
    default:
      return state;
  }
};

export default cartReducer;