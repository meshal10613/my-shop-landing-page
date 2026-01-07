import { ProductsType } from "@/app/components/Home/Products";
import { loadWishlistFromStorage } from "@/utils/wishlistStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishListItem extends ProductsType {
    count: number;
}

interface WishListState {
    items: WishListItem[];
}

const initialState: WishListState = {
    items: loadWishlistFromStorage(),
};

const wishlist = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishList: (state, action: PayloadAction<ProductsType>) => {
            const product = action.payload;
            const exists = state.items.some((item) => item._id === product._id);

            if (!exists) {
                state.items.push({
                    ...product,
                    count: 1,
                });
            }
        },
    },
});

export const { addToWishList } = wishlist.actions;
export const wishlistReducer = wishlist.reducer;
