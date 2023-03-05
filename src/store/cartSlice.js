import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    //to replace an empty data
    replaceData: (state, action) => {
      state.totalQuantity = action.payload.totalPrice;
      state.itemsList = action.payload.itemsList;
      console.log.og(action.payload);
    },
    addToCart: (state, action) => {
      state.changed = true;
      const newItem = action.payload;
      //to check if the item is already
      //   console.log("new",newItem)
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        // console.log(existingItem)
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart: (state, action) => {
      state.changed = true;
      const id = action.payload;
      // console.log("id to remove", id);

      const existingItem = state.itemsList.find((item) => item.id === id);
      // console.log(existingItem)
      if (existingItem.quantity === 1) {
        state.totalQuantity--;
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});
//thunk function:
//const send data

export const cartActions = cartSlice.actions;
export default cartSlice;
