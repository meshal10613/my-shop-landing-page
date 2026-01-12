import { ProductVarient } from "@/app/components/Home/Products";
import { loadCartFromStorage } from "@/utils/cartStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends ProductVarient {
    count: number;
}

interface CartState {
    items: CartItem[];
}

type AddWithCountPayload = {
    product: ProductVarient;
    count: number;
};

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductVarient>) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) =>
                    item._id === product._id &&
                    item.attributes?.Color === product.attributes?.Color
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
                (item) =>
                    item._id === product._id &&
                    item.attributes?.Color === product.attributes?.Color
            );
            console.log(state.items)

            if (existingItem) {
                existingItem.count += count;
            } else {
                state.items.push({
                    ...product,
                    count,
                });
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<{ _id: string; color: string }>
        ) => {
            const { _id, color } = action.payload;
            const existingItem = state.items.find(
                (item) => item._id === _id && item.attributes.Color === color
            );
            if (!existingItem) return;
            existingItem.count -= 1;
            if (existingItem.count <= 0) {
                state.items = state.items.filter(
                    (item) =>
                        !(item._id === _id && item.attributes.Color === color)
                );
            }
        },

        removeItemFromCart: (
            state,
            action: PayloadAction<{ _id: string; color: string }>
        ) => {
            const { _id, color } = action.payload;
            state.items = state.items.filter(
                (item) => !(item._id === _id && item.attributes.Color === color)
            );
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
    removeItemFromCart,
    clearCart,
    hydrateCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
