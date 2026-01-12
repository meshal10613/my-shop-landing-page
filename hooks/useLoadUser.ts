"use client";

import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../utils/getMyProfile";
import { setUser, startLoading, stopLoading } from "@/store/slice/userSlice";

const useLoadUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            dispatch(stopLoading());
            return;
        }

        if (user) {
            dispatch(stopLoading());
            return;
        }

        const fetchUser = async () => {
            dispatch(startLoading());

            try {
                const data = await getMyProfile(token);
                dispatch(setUser(data.data));
            } catch (error) {
                console.error("Profile fetch failed", error);
                dispatch(stopLoading());
            }
        };

        fetchUser();
    }, [dispatch, user]);
};

export default useLoadUser;
