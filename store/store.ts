import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "./slices/product/productSlice";
// import categoryReducer from "./slices/category/categorySlice";
// import type { ProductState } from "./slices/product/productSlice";
// import type { CategoryState } from "./slices/category/categorySlice";

export const store = configureStore({
  reducer: {
    // product: productReducer,
    // category: categoryReducer,
  },
});

export type RootState = {
//   product: ProductState;
//   category: CategoryState;
};
export type AppDispatch = typeof store.dispatch;