import { ProductsType } from "@/app/components/Home/Products";
import { loadCartFromStorage } from "@/utils/cartStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends ProductsType {
    count: number;
}

interface CartState {
    items: CartItem[];
}

type AddWithCountPayload = {
    product: ProductsType;
    count: number;
};

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductsType>) => {
            const product = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === product._id
            );

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({
                    ...product,
                    count: 1,
                });
            }
        },

        addToCartWithCount: (
            state,
            action: PayloadAction<AddWithCountPayload>
        ) => {
            const { product, count } = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === product._id
            );

            if (existingItem) {
                existingItem.count += count;
            } else {
                state.items.push({
                    ...product,
                    count,
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;

            const existingItem = state.items.find(
                (item) => item._id === productId
            );

            if (!existingItem) return;

            existingItem.count -= 1;

            if (existingItem.count <= 0) {
                state.items = state.items.filter(
                    (item) => item._id !== productId
                );
            }
        },

        clearCart: (state) => {
            state.items = [];
        },

        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
    },
});

export const {
    addToCart,
    addToCartWithCount,
    removeFromCart,
    clearCart,
    hydrateCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
