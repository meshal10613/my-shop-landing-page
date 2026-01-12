"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
		if(loading) return;
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-md" />
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;
