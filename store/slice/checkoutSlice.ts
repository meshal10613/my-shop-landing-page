import { ProductVarient } from "@/app/components/Home/Products";
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
	items: [],
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
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
    },
});
export const { addToCheckoutWithCount } = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;
