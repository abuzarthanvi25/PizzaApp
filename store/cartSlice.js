import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      state.splice(
        state.indexOf(state.find(product => product.id === action.payload)),
        1,
      );
      return state;
      // return state.filter(product => product.id !== action.payload);
    },
    removeAll(state) {
      return (state = []);
    },
  },
});

export const {add, remove, removeAll} = cartSlice.actions;
export default cartSlice.reducer;
