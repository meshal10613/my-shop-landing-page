"use client";

import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../utils/getMyProfile";
import { setUser } from "@/store/slice/userSlice";

const useLoadUser = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.user.token);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (!token) {
            return;
        }

        if (user) return;

        const fetchUser = async () => {
            try {
                const data = await getMyProfile(token);
                dispatch(setUser(data.data));
            } catch (error) {
                console.error("Profile fetch failed", error);
            }
        };

        fetchUser();
    }, [token, dispatch, user]);
};

export default useLoadUser;
