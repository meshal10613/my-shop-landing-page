"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { store } from "@/store";
import { saveCartToStorage } from "@/utils/cartStorage";
import { saveWishlistToStorage } from "@/utils/wishlistStorage";
import { saveCheckoutToStorage } from "@/utils/checkoutStorage";

export default function ReduxProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
        useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const { cart, wishlist, checkout } = store.getState();
            saveCartToStorage(cart.items);
            saveWishlistToStorage(wishlist.items);
            saveCheckoutToStorage(checkout.items);
        });

        return unsubscribe;
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
