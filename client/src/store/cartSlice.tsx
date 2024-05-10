import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../interfaces/CartItem';

const initialState = {
  items: [] as CartItem[],
  fee: 15,
  freeDeleveryFrom: 200,
  subTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        item => item.product.id === newProduct._id,
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    changeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const cartItem = state.items.find(item => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
      if (cartItem.quantity <= 0) {
        state.items = state.items.filter(item => item.product.id !== productId);
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, changeQuantity } = cartSlice.actions;

export const selectedNumberOfItems = (state: any) => state.cart.items.length;
export const selectSubtotal = (state: any) =>
  state.cart.items.reduce(
    (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
    0,
  );

const cartSelector = (state: any) => state.cart;

export const selectDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeleveryFrom ? 0 : cart.fee),
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryPrice,
  (subtotal, deliveryPrice) => subtotal + deliveryPrice,
);
