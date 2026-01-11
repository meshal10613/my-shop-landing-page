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
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setToken, setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;