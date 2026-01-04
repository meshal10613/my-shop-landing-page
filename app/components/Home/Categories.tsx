"use client";

import React from "react";
import p1 from "@/app/assets/p1.png";
import p2 from "@/app/assets/p2.png";
import p3 from "@/app/assets/p3.png";
import p4 from "@/app/assets/p4.png";
import p5 from "@/app/assets/p5.png";
import p6 from "@/app/assets/p6.png";
import p7 from "@/app/assets/p7.png";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const categories = [
    { id: 1, image: p1, name: "Fruits" },
    { id: 2, image: p2, name: "Vegitables" },
    { id: 3, image: p3, name: "Food & Chips" },
    { id: 4, image: p4, name: "Dairy Goods" },
    { id: 5, image: p5, name: "Meals" },
    { id: 6, image: p6, name: "Fish & Seafoods" },
    { id: 7, image: p7, name: "Tea & Coffe" },
];

const responsive = {
    "2xl": { breakpoint: { max: 4000, min: 1536 }, items: 7 },
    xl: { breakpoint: { max: 1535, min: 1280 }, items: 6 },
    lg: { breakpoint: { max: 1279, min: 1024 }, items: 5 },
    md: { breakpoint: { max: 1023, min: 464 }, items: 3 },
    sm: { breakpoint: { max: 463, min: 0 }, items: 3 },
};

export default function Categories() {
    return (
        <section className="py-12">
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
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="text-center group cursor-pointer bg-white shadow-xl py-5"
                        >
                            <div className="relative w-20 h-20 mx-auto mb-4 overflow-hiddenshadow-xl transition-all duration-300 group-hover:scale-110">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-lg text-gray-400 group-hover:text-primary transition-colors">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}
