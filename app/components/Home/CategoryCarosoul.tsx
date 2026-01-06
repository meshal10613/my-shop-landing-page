"use client";

import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    "2xl": { breakpoint: { max: 4000, min: 1536 }, items: 7 },
    xl: { breakpoint: { max: 1535, min: 1280 }, items: 6 },
    lg: { breakpoint: { max: 1279, min: 1024 }, items: 5 },
    md: { breakpoint: { max: 1023, min: 464 }, items: 3 },
    sm: { breakpoint: { max: 463, min: 0 }, items: 3 },
};

type Category = {
    _id: string;
    storeId: string;
    parentCategory: string;
    childCategory: string[]; // empty array of strings
    subCategory: string[]; // empty array of strings
    path: string;
    imageURLs: string;
    status: boolean;
    position: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
};

type Props = {
    categories: Category[];
};

export default function CategoriesCarousel({ categories }: Props) {
    return (
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
            {categories.map((category) => (
                <div
                    key={category._id}
                    className="text-center group cursor-pointer bg-white shadow-xl py-5"
                >
                    <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden transition-all duration-300 group-hover:scale-110">
                        <Image
                            src={category.imageURLs}
                            alt={category.parentCategory}
                            width={100}
                            height={100}
                            className="object-cover"
                        />
                    </div>
                    <p className="text-base text-gray-400 group-hover:text-primary transition-colors">
                        {category.parentCategory}
                    </p>
                </div>
            ))}
        </Carousel>
    );
}
