import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const url = "https://tide-web-app.azurewebsites.net/api/products";

export const getProductsData = createAsyncThunk(
  "products/getProductsData",
  async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      throw error instanceof Error
        ? new Error(`Failed to fetch data. Error: ${error.message}`)
        : new Error("Unknown error");
    }
  }
);

type Product = {
  id: string;
  user_id: number;
  category_id: number;
  images: string[];
  description: string;
  price: number;
  quantity: number;
  sku: string;
  weight: string;
  created_at: string;
  updated_at: string;
};
type CartState = {
  productsData: Product[];
  isLoading: boolean;
};

const initialState: CartState = {
  productsData: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProductsData.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.productsData = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getProductsData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default productsSlice.reducer;
