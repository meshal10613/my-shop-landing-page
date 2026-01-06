"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const responsive = {
    "2xl": { breakpoint: { max: 4000, min: 1536 }, items: 7 },
    xl: { breakpoint: { max: 1535, min: 1280 }, items: 6 },
    lg: { breakpoint: { max: 1279, min: 1024 }, items: 5 },
    md: { breakpoint: { max: 1023, min: 464 }, items: 3 },
    sm: { breakpoint: { max: 463, min: 0 }, items: 3 },
};

type CategoriesType = {
    _id: string;
    parentCategory: string;
    childCategory: string[];
    imageURLs: string[] | StaticImport[];
    imageURLs2?: string[];
    status: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export default function Categories() {
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    "https://server-homeshopbd-2-kohl.vercel.app/api/v1/category"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await res.json();

                setCategories(Array.isArray(data.data?.result) ? data.data.result : []);
            } catch (err) {
                console.log(err)
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <span className="loading loading-spinner loading-md"></span>;
    if (error) return <p>{error}</p>;
    console.log(categories)
    return (
        <section className="my-10">
            <div className="container mx-auto px-4">
                <h2 className="text-xl lg:text-2xl font-semibold mb-10">
                    Categories
                </h2>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    arrows={true}
                    partialVisible={false}
                    centerMode={false}
                    containerClass="pb-8"
                    itemClass="px-4"
                >
                    {categories?.map((category: CategoriesType) => (
                        <div
                            key={category._id}
                            className="text-center group cursor-pointer bg-white shadow-xl py-5"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-4 overflow-hiddenshadow-xl transition-all duration-300 group-hover:scale-110">
                                <Image
                                    src={category.imageURLs[0]}
                                    alt={category.parentCategory}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-base text-gray-400 group-hover:text-primary transition-colors">
                                {category.parentCategory}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
