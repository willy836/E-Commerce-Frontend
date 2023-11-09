import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
