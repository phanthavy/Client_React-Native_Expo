import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { productParams, productPayload } from "./productTypes";
import { getProductApi, postProductApi } from "./productApi";

export const getProductThunks = createAsyncThunk(
  "product/getProducts",
  async (params: productParams, { rejectWithValue }) => {
    try {
      const response = await getProductApi(params);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("can not get products, server failed");
    }
  },
);

export const postProductThunks = createAsyncThunk(
  "product/postProdct",
  async (payload: productPayload, { rejectWithValue }) => {
    try {
      const response = await postProductApi(payload);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("can not post product, server failed");
    }
  },
);
