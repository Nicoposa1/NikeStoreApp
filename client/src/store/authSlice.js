import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../interfaces/CartItem';

const initialState = {
  token: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { setToken } = cartSlice.actions;
