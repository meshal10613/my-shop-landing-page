import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";
import { saveCartToStorage } from "@/utils/cartStorage";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

store.subscribe(() => {
    const { cart } = store.getState();
	saveCartToStorage(cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
