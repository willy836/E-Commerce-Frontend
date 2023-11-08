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
  name: string;
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
  amount: number;
};
type CartState = {
  productsData: Product[];
  cartItems: Product[];
  amount: number;
  total: number;
  isLoading: boolean;
};

const initialState: CartState = {
  productsData: [],
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.productsData.filter((product) => {
        product.id === payload;
      });
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((product) => {
        product.id !== payload;
      });
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increase: (state, { payload }: PayloadAction<string>) => {
      const product = state.cartItems.find((product) => product.id === payload);
      product!.amount += 1;
    },
    decrease: (state, { payload }: PayloadAction<string>) => {
      const product = state.cartItems.find((product) => product.id === payload);
      product!.amount -= 1;
    },
    calculateTotals: (state) => {
      let itemsAmount = 0;
      let itemsTotal = 0;

      state.productsData.forEach((product) => {
        itemsAmount += product.amount;
        itemsTotal += product.amount * product.price;
      });

      state.amount = itemsAmount;
      state.total = itemsTotal;
    },
  },
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

export const {
  addItem,
  removeItem,
  clearCart,
  increase,
  decrease,
  calculateTotals,
} = productsSlice.actions;

export default productsSlice.reducer;
