import axiosInstance from "@/service/axiosInstance";
import {
  productApi,
  productParams,
  productPayload,
  productResponse,
} from "./productTypes";

export const getProductApi = async (
  params: productParams,
): Promise<productResponse<productApi[]>> => {
  const response = await axiosInstance.get("/products", { params });
  return response.data;
};

export const postProductApi = async (
  payload: productPayload,
): Promise<productResponse<productApi>> => {
  const response = await axiosInstance.post("/products", payload);
  return response.data;
};

