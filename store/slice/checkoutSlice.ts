import { ProductVarient } from "@/app/components/Home/Products";
import { loadCheckoutFromStorage } from "@/utils/checkoutStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChekoutItem extends ProductVarient {
    count: number;
}

interface ChekoutState {
    items: ChekoutItem[];
}

type AddWithCountPayload = {
    product: ProductVarient;
    count: number;
};

const initialState: ChekoutState = {
    items: loadCheckoutFromStorage(),
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        addToCheckout: (state, action: PayloadAction<ProductVarient>) => {
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

        addToCheckoutWithCount: (
            state,
            action: PayloadAction<AddWithCountPayload>
        ) => {
            const { product, count } = action.payload;

            const existingItem = state.items.find(
                (item) =>
                    item._id === product._id &&
                    item.attributes.Color === product.attributes.Color
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

        removeFromChekout: (
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

        removeItemFromCheckout: (
            state,
            action: PayloadAction<{ _id: string; color: string }>
        ) => {
            const { _id, color } = action.payload;
            state.items = state.items.filter(
                (item) => !(item._id === _id && item.attributes.Color === color)
            );
        },
    },
});
export const {
    addToCheckout,
    addToCheckoutWithCount,
    removeFromChekout,
    removeItemFromCheckout,
} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
