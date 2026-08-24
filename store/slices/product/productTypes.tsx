export type productParams = {
  page: number;
  pageize: number;
};

export type productResponse<T> = {
  success: boolean;
  messsage: string;
  page: number;
  pageSize: number;
  tolal: number;
  data: T;
};

export type productApi = {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_image: string[] | null;
};

export type productPayload = Omit<productApi, "product_id">;
