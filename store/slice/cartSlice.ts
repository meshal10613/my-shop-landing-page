import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    count: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ id, count: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.count -= 1;
                if (item.count <= 0) {
                    state.items = state.items.filter(
                        (i) => i.id !== action.payload
                    );
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
