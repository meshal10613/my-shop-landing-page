"use client";

import { setToken } from "@/store/slice/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface LoginFormData {
    phoneNumber: string;
    password: string;
}

const LoginUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<LoginFormData>({
        phoneNumber: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(
                "https://ecommerce-saas-server-wine.vercel.app/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phoneNumber: formData.phoneNumber,
                        password: formData.password,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }
            const token = data.data.accessToken;
            localStorage.setItem("token", token);
            dispatch(setToken(token));

            setFormData({
                phoneNumber: "",
                password: "",
            });

            Swal.fire({
                title: "Congratulations!",
                text: "You've successfully logged in!",
                icon: "success",
                confirmButtonColor: "#3BB77E",
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-5">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />
                <p>
                    Don&apos;t have an account?{" "}
                    <Link
                        href={`/register`}
                        className="hover:link hover:link-primary"
                    >
                        Register
                    </Link>
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-block border-2 border-primary bg-primary text-white transition-all hover:bg-white hover:text-primary disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
};

export default LoginUser;
