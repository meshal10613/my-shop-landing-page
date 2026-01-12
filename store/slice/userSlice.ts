import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id: string;
    id: string;

    name: string;
    email: string;
    phoneNumber: string;
    gender: "male" | "female" | "other";

    address: string;
    profileImgURL: string;

    userRole: "user" | "client" | "admin";
    storeId: string;
    status: "approved" | "pending" | "blocked";

    isVerified: boolean;
    isAddProfile: boolean;

    amount: number;
    pending_amount: number;
    walletValue: number;
    withdraw_amount: number;

    paymentStatus: "paid" | "failed" | "pending";
    paymentRequest: boolean;

    account: [];

    codeGenerationTimestamp: string;
    createdAt: string;
    updatedAt: string;

    __v: number;
}

export interface UserState {
    user: User | null;
    token: string | null;
    loading: boolean;
}

export const initialState: UserState = {
    user: null,
    token: null,
    loading: true,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.loading = false;
        },
    },
});

export const { startLoading, stopLoading, setToken, setUser, logout } =
    userSlice.actions;
export const userReducer = userSlice.reducer;
