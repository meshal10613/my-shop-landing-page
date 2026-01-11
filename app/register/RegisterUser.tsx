"use client";

import { setToken, setUser } from "@/store/slice/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface RegisterFormData {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
}

const RegisterUser = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
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
                "https://ecommerce-saas-server-wine.vercel.app/api/v1/users/customer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phoneNumber: formData.phoneNumber,
                        password: formData.password,
                        userRole: "user",
                        storeId: "0000121",
                        status: "approved",
                        isVerified: true,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }
            console.log(data);
            const token = data.data.accessToken
            localStorage.setItem("token", token);
            dispatch(setToken(token));
            dispatch(setUser(data.data.user))
            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
            });
            Swal.fire({
                title: "Congratulations!",
                text: "You've successfully signed up!",
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
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Register
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                />

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
                    Already have an account?{" "}
                    <Link
                        href={`/login`}
                        className="hover:link hover:link-primary"
                    >
                        Login
                    </Link>
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-block border-2 border-primary bg-primary text-white transition-all hover:bg-white hover:text-primary disabled:opacity-60"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
    );
};

export default RegisterUser;
