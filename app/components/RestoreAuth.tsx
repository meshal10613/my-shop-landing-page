"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slice/userSlice";

export default function RestoreAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setToken(token));
        }
    }, [dispatch]);

    return null;
}
