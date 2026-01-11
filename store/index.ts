import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice";
import { saveCartToStorage } from "@/utils/cartStorage";
import { wishlistReducer } from "./slice/wishlistSlice";
import { saveWishlistToStorage } from "@/utils/wishlistStorage";
import { checkoutReducer } from "./slice/checkoutSlice";
import { userReducer } from "./slice/userSlice";
// import { saveUseroStorage } from "@/utils/userStorage";

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        user: userReducer,
    },
});

store.subscribe(() => {
    const { cart, wishlist } = store.getState();
	saveCartToStorage(cart.items);
    saveWishlistToStorage(wishlist.items);
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
