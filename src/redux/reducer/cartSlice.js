import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
 addToCart: (state, action) => {
  const newItem = action.payload;
  const existingItem = state.items.find((item) => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity += 1;
    state.totalPrice += existingItem.price;
  } else {
    state.items=[...state.items,{ ...newItem, quantity: 1 }];
    // state.items.push({ ...newItem, quantity: 1 });
    state.totalPrice += newItem.price;
  }
},
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity -= 1;
        }
      }
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;