import { createSlice } from '@reduxjs/toolkit';
import { React } from 'react';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1});
        }
        state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const name = action.payload.name;
      const itemToRemove = state.items.find(item => item.name === name);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; 
        state.items = state.items.filter(item => item.name !== name);
      }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          const quantityChange = quantity - itemToUpdate.quantity;
          itemToUpdate.quantity = quantity;
          state.totalQuantity += quantityChange;

          if (itemToUpdate.quantity === 0) {
            state.items = state.items.filter(item => item.name !== name);
          }
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
