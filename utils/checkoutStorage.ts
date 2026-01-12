import { ChekoutItem } from "@/store/slice/checkoutSlice";

const CHEKOUT_KEY = "chekout_items";

export const loadCheckoutFromStorage = (): ChekoutItem[] => {
	if (typeof window === "undefined") return [];

	try {
		const data = localStorage.getItem(CHEKOUT_KEY);
		return data ? JSON.parse(data) : [];
	} catch (error) {
		console.error("Failed to load cart:", error);
		return [];
	}
};

export const saveCheckoutToStorage = (items: ChekoutItem[]) => {
	if (typeof window === "undefined") return;

	try {
		localStorage.setItem(CHEKOUT_KEY, JSON.stringify(items));
	} catch (error) {
		console.error("Failed to save cart:", error);
	}
};