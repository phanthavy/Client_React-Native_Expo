import { createSlice } from "@reduxjs/toolkit";
import { getProductThunks } from "./productThunk";
import { productApi } from "./productTypes";

export interface ProductState {
  data: productApi[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductThunks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductThunks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.tolal;
      })
      .addCase(getProductThunks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
