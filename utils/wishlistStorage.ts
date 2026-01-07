import { WishListItem } from "@/store/slice/wishlistSlice";

const WISHLIST_KEY = "wishlist_items";

export const loadWishlistFromStorage = (): WishListItem[] => {
	if (typeof window === "undefined") return [];

	try {
		const data = localStorage.getItem(WISHLIST_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error("Failed to load cart:", error);
		return [];
	}
};

export const saveWishlistToStorage = (items: WishListItem[]) => {
	if (typeof window === "undefined") return;

	try {
		localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
	} catch (error) {
		console.error("Failed to save cart:", error);
	}
};