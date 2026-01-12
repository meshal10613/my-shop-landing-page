import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";
import { wishlistReducer } from "./slice/wishlistSlice";
import { checkoutReducer } from "./slice/checkoutSlice";
import { userReducer } from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        user: userReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
