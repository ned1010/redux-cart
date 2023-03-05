//thunk function: action creator, delays the action and returns the another function
//thunk function allows react use async function

import { cartActions } from "./cartSlice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async() => {
      //get method - so need to specify
      //promise
      const res = await fetch(
        "https://redux-http-b9ce0-default-rtdb.firebaseio.com/cartItems.json"
      );
      const data = await res.json();
      return data;
      
    };
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      //send state the Sending request
      const res = await fetch(
        "https://redux-http-b9ce0-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      //this means there was no error
      //send state as request is successfull
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request successfully to the Database",
          type: "success",
        })
      );
    };
    try {
      await sendRequest();
    } catch (err) {
      //send state as error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    }
  };
};
