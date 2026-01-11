export const getMyProfile = async (token: string) => {
    const res = await fetch(
        "https://ecommerce-saas-server-wine.vercel.app/api/v1/users/my-profile",
        {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return res.json();
};
