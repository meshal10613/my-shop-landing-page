"use client";

import React, { useEffect, useState } from "react";
import CategoriesCarousel from "./CategoryCarosoul";

type Category = {
    _id: string;
    storeId: string;
    parentCategory: string;
    childCategory: string[];
    subCategory: string[];
    path: string;
    imageURLs: string;
    status: boolean;
    position: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        fetch(
            "https://ecommerce-saas-server-wine.vercel.app/api/v1/category/website/0000121",
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((res) => res.json())
            .then((data) => setCategories(data.data))
            .catch((err) => console.error("Failed to fetch categories:", err));
    }, []);

    return (
        <section className="my-10">
            <div className="container mx-auto px-4">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                    Categories
                </h2>
                <CategoriesCarousel categories={categories} />
            </div>
        </section>
    );
}
